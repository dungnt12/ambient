import type { ExpoConfig } from 'expo/config';

const appBackgroundColor = '#f5f4ed';

const config: ExpoConfig = {
  name: 'Ambient',
  slug: 'ambient',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  newArchEnabled: true,
  splash: {
    image: './assets/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: appBackgroundColor,
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'app.ambient.mobile',
  },
  android: {
    package: 'app.ambient.mobile',
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: appBackgroundColor,
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
  },
  web: {
    favicon: './assets/favicon.png',
  },
  plugins: ['expo-font', 'expo-localization'],
};

export default config;
