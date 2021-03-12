package com.example.StatusBar;

import android.annotation.TargetApi;
import android.app.Activity;
import android.graphics.Color;
import android.os.Build;
import android.view.View;
import android.view.Window;
import android.view.WindowInsets;
import android.view.WindowManager;

import androidx.core.view.ViewCompat;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import static com.facebook.react.bridge.UiThreadUtil.runOnUiThread;

public class AndroidStatusBarModule extends ReactContextBaseJavaModule {

    public AndroidStatusBarModule(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
    }

    @Override
    public String getName() {
        return "AndroidStatusBarModule";
    }

    @ReactMethod
    public void setTranslucent(boolean translucent) {
        runOnUiThread(() -> {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                Window window = getCurrentActivity().getWindow();
                View decorView = window.getDecorView();
                if (translucent) {
                    window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
                    window.setStatusBarColor(Color.TRANSPARENT);
                    decorView.setSystemUiVisibility(isDark() ? View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR : 0);
                    decorView.setOnApplyWindowInsetsListener((v, insets) -> {
                        WindowInsets defaultInsets = v.onApplyWindowInsets(insets);
                        return defaultInsets.replaceSystemWindowInsets(
                                defaultInsets.getSystemWindowInsetLeft(),
                                0,
                                defaultInsets.getSystemWindowInsetRight(),
                                defaultInsets.getSystemWindowInsetBottom());
                    });
                } else {
                    decorView.setOnApplyWindowInsetsListener(null);
                }
                ViewCompat.requestApplyInsets(decorView);
            }
        });
    }

    @TargetApi(23)
    private boolean isDark() {
        Activity activity = getCurrentActivity();
        // fix activity NPE
        if (activity == null) {
            return true;
        }
        return (activity.getWindow().getDecorView().getSystemUiVisibility() & View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR) != 0;
    }
}
