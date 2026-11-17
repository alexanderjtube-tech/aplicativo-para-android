package co.aic.circuitocordoba;

import android.content.ContentResolver;
import android.content.ContentValues;
import android.content.Context;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.print.PrintAttributes;
import android.print.PrintDocumentAdapter;
import android.print.PrintManager;
import android.provider.MediaStore;
import android.util.Base64;
import android.webkit.WebView;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.io.IOException;
import java.io.OutputStream;

/**
 * - print: abre el diálogo de impresión de Android (imprimir o "Guardar como PDF").
 * - saveToDownloads: guarda un archivo (Word, Excel, CSV...) directamente en la carpeta Descargas.
 */
@CapacitorPlugin(name = "NativePrint")
public class NativePrintPlugin extends Plugin {

    @PluginMethod
    public void print(final PluginCall call) {
        final String name = call.getString("name", "AIC");

        getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                try {
                    WebView webView = getBridge().getWebView();
                    PrintManager printManager =
                            (PrintManager) getActivity().getSystemService(Context.PRINT_SERVICE);
                    String jobName = name + " - AIC";
                    PrintDocumentAdapter adapter = webView.createPrintDocumentAdapter(jobName);
                    printManager.print(jobName, adapter, new PrintAttributes.Builder().build());
                    call.resolve();
                } catch (Exception e) {
                    call.reject("No se pudo abrir la impresión: " + e.getMessage());
                }
            }
        });
    }

    @PluginMethod
    public void saveToDownloads(final PluginCall call) {
        final String fileName = call.getString("fileName", "archivo");
        final String mimeType = call.getString("mimeType", "application/octet-stream");
        final String data = call.getString("data");

        if (data == null || data.length() == 0) {
            call.reject("No hay datos para guardar");
            return;
        }
        // En Android 9 o anterior se necesita un permiso extra: se rechaza para que la web use "Compartir".
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.Q) {
            call.reject("legacy");
            return;
        }

        OutputStream out = null;
        try {
            byte[] bytes = Base64.decode(data, Base64.DEFAULT);
            ContentResolver resolver = getContext().getContentResolver();

            ContentValues values = new ContentValues();
            values.put(MediaStore.MediaColumns.DISPLAY_NAME, fileName);
            values.put(MediaStore.MediaColumns.MIME_TYPE, mimeType);
            values.put(MediaStore.MediaColumns.RELATIVE_PATH, Environment.DIRECTORY_DOWNLOADS);

            Uri uri = resolver.insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, values);
            if (uri == null) {
                throw new IOException("No se pudo crear el archivo en Descargas");
            }
            out = resolver.openOutputStream(uri);
            if (out == null) {
                throw new IOException("No se pudo abrir el archivo para escribir");
            }
            out.write(bytes);
            out.flush();

            JSObject result = new JSObject();
            result.put("uri", uri.toString());
            result.put("fileName", fileName);
            call.resolve(result);
        } catch (Exception e) {
            call.reject("No se pudo guardar en Descargas: " + e.getMessage());
        } finally {
            if (out != null) {
                try {
                    out.close();
                } catch (IOException ignored) {
                    // sin acción
                }
            }
        }
    }
}
