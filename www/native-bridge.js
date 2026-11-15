/*
 * Puente entre la web y la app Android (Capacitor).
 * - En un navegador normal NO hace nada (la web funciona igual que antes).
 * - Dentro de la app Android:
 *     · Las descargas (CSV, Excel .xls, Word .doc) se guardan y se abren con el menú
 *       "Compartir" de Android (guardar en Drive, WhatsApp, correo, etc.).
 *     · "Guardar como PDF" / imprimir usa el diálogo nativo de impresión de Android.
 */
(function () {
  'use strict';

  var C = window.Capacitor;
  var isNative = !!(C && typeof C.isNativePlatform === 'function' && C.isNativePlatform());
  if (!isNative) return;

  function plugin(name) {
    return (C.Plugins && C.Plugins[name]) || C.registerPlugin(name);
  }

  function say(msg) {
    try { if (typeof window.notify === 'function') window.notify(msg); } catch (e) { /* sin aviso */ }
  }

  function isCancel(err) {
    return /cancel/i.test(String((err && (err.message || err.errorMessage)) || err || ''));
  }

  /* ---------- Descargas: se recuerdan los Blob creados con createObjectURL ---------- */
  var blobs = new Map();
  var nativeCreate = URL.createObjectURL.bind(URL);
  var nativeRevoke = URL.revokeObjectURL.bind(URL);

  URL.createObjectURL = function (obj) {
    var url = nativeCreate(obj);
    if (typeof Blob !== 'undefined' && obj instanceof Blob) blobs.set(url, obj);
    return url;
  };
  URL.revokeObjectURL = function (url) {
    nativeRevoke(url);
    // El Blob se conserva unos segundos para poder guardarlo aunque la web ya lo haya "revocado".
    setTimeout(function () { blobs.delete(url); }, 30000);
  };

  function blobToBase64(blob) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function () {
        var s = String(reader.result || '');
        resolve(s.indexOf(',') >= 0 ? s.split(',')[1] : '');
      };
      reader.onerror = function () { reject(reader.error || new Error('No se pudo leer el archivo')); };
      reader.readAsDataURL(blob);
    });
  }

  function saveAndShare(blob, fileName) {
    var safeName = String(fileName || 'archivo').replace(/[\\/:*?"<>|]+/g, '-');
    return blobToBase64(blob)
      .then(function (data) {
        return plugin('Filesystem').writeFile({ path: safeName, data: data, directory: 'CACHE' });
      })
      .then(function (res) {
        return plugin('Share').share({
          title: safeName,
          dialogTitle: 'Guardar o compartir',
          url: res.uri
        });
      })
      .catch(function (err) {
        if (isCancel(err)) return; // la persona cerró el menú de compartir
        console.error('Error al guardar la descarga:', err);
        say('No se pudo guardar el archivo');
      });
  }

  var nativeAnchorClick = HTMLAnchorElement.prototype.click;
  HTMLAnchorElement.prototype.click = function () {
    if (this.hasAttribute('download') && blobs.has(this.href)) {
      saveAndShare(blobs.get(this.href), this.getAttribute('download'));
      return;
    }
    return nativeAnchorClick.apply(this, arguments);
  };

  // Clic real del usuario sobre un enlace con "download"
  document.addEventListener('click', function (ev) {
    var a = ev.target && ev.target.closest ? ev.target.closest('a[download]') : null;
    if (a && blobs.has(a.href)) {
      ev.preventDefault();
      saveAndShare(blobs.get(a.href), a.getAttribute('download'));
    }
  }, true);

  /* ---------- Impresión / PDF ---------- */
  function nativePrint(name) {
    return plugin('NativePrint')
      .print({ name: name || document.title || 'AIC' })
      .catch(function (err) {
        console.error('Error al imprimir:', err);
        say('No se pudo abrir la impresión');
      });
  }

  // window.print() → diálogo de impresión de Android (permite "Guardar como PDF")
  window.print = function () {
    document.body.classList.remove('native-print-report');
    return nativePrint(document.title);
  };

  // La web arma el informe en una ventana nueva (window.open + document.write + print).
  // Aquí se captura ese HTML y se imprime dentro de la propia app.
  var nativeOpen = window.open ? window.open.bind(window) : null;

  function printReportHtml(html) {
    var parsed = new DOMParser().parseFromString(html, 'text/html');
    var css = Array.prototype.map.call(parsed.querySelectorAll('style'), function (s) { return s.textContent; })
      .join('\n')
      .replace(/@page\s*\{[^}]*\}/g, '')
      .replace(/(^|\})\s*body\s*\{/g, '$1.np-body{');
    var title = (parsed.title || document.title || 'Informe').trim();
    Array.prototype.forEach.call(parsed.querySelectorAll('script'), function (s) { s.remove(); });

    var host = document.getElementById('nativePrintHost');
    if (!host) {
      host = document.createElement('div');
      host.id = 'nativePrintHost';
      document.body.appendChild(host);
      host.attachShadow({ mode: 'open' });
    }
    host.shadowRoot.innerHTML = '<style>' + css + '</style><div class="np-body">' + parsed.body.innerHTML + '</div>';
    document.body.classList.add('native-print-report');
    // pequeña pausa para que el navegador interno termine de pintar el informe
    setTimeout(function () { nativePrint(title); }, 250);
  }

  window.open = function (url) {
    if (url && url !== 'about:blank') {
      return nativeOpen ? nativeOpen.apply(window, arguments) : null; // enlaces externos
    }
    var parts = [];
    return {
      document: {
        write: function (h) { parts.push(String(h)); },
        close: function () { printReportHtml(parts.join('')); }
      },
      focus: function () {},
      print: function () {},
      close: function () {}
    };
  };
})();
