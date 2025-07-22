package com.icilongolevangeliapp

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
// import org.devio.rn.splashscreen.SplashScreen; ❌ optional, also can be removed

class MainActivity : ReactActivity() {

  override fun getMainComponentName(): String = "iCilongoLeVangeliApp"

  override fun createReactActivityDelegate(): ReactActivityDelegate {
    return DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
  }

  // ⚠️ Make sure SplashScreen.show(...) is completely gone
}
