# AIC · Circuito Córdoba

Aplicación de administración de la Asamblea de Iglesias Cristianas — Circuito Córdoba.
Web (HTML/CSS/JS) empaquetada como app Android con [Capacitor](https://capacitorjs.com).

## Estructura
- `www/` → la aplicación web (aquí se edita todo: `index.html`, `app.js`, `styles.css`…).
- `android/` → proyecto de Android Studio (generado por Capacitor).
- `capacitor.config.json` → nombre y paquete de la app (`AIC Córdoba`, `co.aic.circuitocordoba`).
- `www/native-bridge.js` → hace funcionar descargas (CSV/Excel/Word) y PDF dentro de Android.
- `android/app/src/main/java/co/aic/circuitocordoba/NativePrintPlugin.java` → diálogo de impresión/"Guardar como PDF".

## Abrir y ejecutar en Android Studio
1. Instala **Android Studio** (versión Otter 2025.2.1 o más nueva).
2. `File → Open` y elige la carpeta **`android`** de este proyecto (no la raíz).
3. Espera a que termine **Gradle Sync** (la primera vez descarga componentes; necesita internet).
4. Conecta un teléfono con "Depuración USB" activada, o crea un emulador, y pulsa ▶ **Run**.

## Generar el APK
`Build → Build Bundle(s) / APK(s) → Build APK(s)`. El archivo queda en `android/app/build/outputs/apk/debug/`.
(Para publicar en Play Store hay que firmar la app con una clave propia: guárdala fuera del repositorio.)

## Cambiar la web y actualizar la app
1. Edita los archivos en `www/`.
2. Con Node.js instalado, en la raíz del proyecto: `npm install` (solo la primera vez) y `npx cap sync android`.
3. Vuelve a ejecutar desde Android Studio.

## Si clonas el repositorio en otro equipo
Hay que restaurar lo que Git no guarda: ejecuta `npm install` y luego `npx cap sync android`.
