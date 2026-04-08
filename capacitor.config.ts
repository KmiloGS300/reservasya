import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'reservasya',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000, 
      launchAutoHide: true,    
      backgroundColor: "#5289ef",
      androidScaleType: "CENTER_CROP", 
      showSpinner: false
    }
  }
};

export default config;
