package co.aic.circuitocordoba;

import android.os.Bundle;
import android.webkit.ValueCallback;
import android.webkit.WebView;

import androidx.activity.OnBackPressedCallback;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        // Los plugins propios se registran ANTES de super.onCreate
        registerPlugin(NativePrintPlugin.class);
        super.onCreate(savedInstanceState);

        // Botón "atrás" del celular: la app web decide qué hacer (cerrar ventana o menú, volver a la
        // pantalla anterior, pedir cerrar sesión). Solo si la app responde que no manejó el botón
        // (por ejemplo, en la pantalla de inicio de sesión) se cierra la aplicación.
        getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                WebView webView = getBridge() != null ? getBridge().getWebView() : null;
                if (webView == null) {
                    exitApp();
                    return;
                }
                webView.evaluateJavascript(
                        "(function(){try{return window.aicBack?window.aicBack():false}catch(e){return false}})()",
                        new ValueCallback<String>() {
                            @Override
                            public void onReceiveValue(String value) {
                                if (!"true".equals(value)) {
                                    exitApp();
                                }
                            }
                        });
            }

            private void exitApp() {
                setEnabled(false);
                getOnBackPressedDispatcher().onBackPressed();
            }
        });
    }
}
