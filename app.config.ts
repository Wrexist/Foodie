import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Palate',
  slug: 'palate',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'dark',
  scheme: 'palate',
  splash: {
    image: './assets/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#0B0D10',
  },
  ios: {
    supportsTablet: false,
    bundleIdentifier: 'com.palate.app',
    usesAppleSignIn: true,
    config: {
      usesNonExemptEncryption: false,
    },
    infoPlist: {
      NSLocationWhenInUseUsageDescription:
        'Palate uses your location to show nearby restaurants on the map.',
      NSPhotoLibraryUsageDescription:
        'Palate needs access to your photos to add images to your reviews.',
      NSCameraUsageDescription:
        'Palate needs camera access to take photos for your reviews.',
    },
    associatedDomains: ['applinks:palateapp.com'],
  },
  android: {
    package: 'com.palate.app',
    adaptiveIcon: {
      backgroundColor: '#0B0D10',
      foregroundImage: './assets/android-icon-foreground.png',
      backgroundImage: './assets/android-icon-background.png',
    },
    config: {
      googleMaps: {
        apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
      },
    },
    intentFilters: [
      {
        action: 'VIEW',
        autoVerify: true,
        data: [
          {
            scheme: 'palate',
          },
          {
            scheme: 'https',
            host: 'palateapp.com',
            pathPrefix: '/place',
          },
          {
            scheme: 'https',
            host: 'palateapp.com',
            pathPrefix: '/review',
          },
          {
            scheme: 'https',
            host: 'palateapp.com',
            pathPrefix: '/user',
          },
        ],
        category: ['BROWSABLE', 'DEFAULT'],
      },
    ],
  },
  plugins: [
    'expo-router',
    'expo-secure-store',
    'expo-apple-authentication',
    'expo-font',
    [
      'expo-splash-screen',
      {
        backgroundColor: '#0B0D10',
        image: './assets/splash-icon.png',
        imageWidth: 200,
      },
    ],
    [
      'expo-image-picker',
      {
        photosPermission:
          'Palate needs access to your photos to add images to your reviews.',
        cameraPermission:
          'Palate needs camera access to take photos for your reviews.',
      },
    ],
    [
      'expo-location',
      {
        locationWhenInUsePermission:
          'Palate uses your location to show nearby restaurants on the map.',
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
});
