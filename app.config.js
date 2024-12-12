const googleMapsApiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

module.exports = {
  expo: {
    name: 'Wanderplaces',
    slug: 'Wanderplaces',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.louiscohen.wanderplaces',
      config: {
        googleMapsApiKey,
      },
      infoPlist: {
        LSApplicationQueriesSchemes: [
          'comgooglemaps',
          'citymapper',
          'uber',
          'lyft',
          'transit',
          'truckmap',
          'waze',
          'yandexnavi',
          'moovit',
          'yandextaxi',
          'yandexmaps',
          'kakaomap',
          'tmap',
          'szn-mapy',
          'mapsme',
          'osmandmaps',
          'gett',
          'nmap',
          'dgis',
          'lftgpas',
        ],
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.louiscohen.wanderplaces',
    },
    web: {
      favicon: './assets/favicon.png',
      config: {
        googleMapsApiKey,
      },
    },
    plugins: [
      [
        'expo-font',
        {
          fonts: [
            './assets/fonts/space-grotesk/SpaceGrotesk_300Light.ttf',
            './assets/fonts/space-grotesk/SpaceGrotesk_400Regular.ttf',
            './assets/fonts/space-grotesk/SpaceGrotesk_500Medium.ttf',
            './assets/fonts/space-grotesk/SpaceGrotesk_600SemiBold.ttf',
            './assets/fonts/space-grotesk/SpaceGrotesk_700Bold.ttf',
            'node_modules/@expo-google-fonts/syne/Syne_400Regular.ttf',
            'node_modules/@expo-google-fonts/syne/Syne_500Medium.ttf',
            'node_modules/@expo-google-fonts/syne/Syne_600SemiBold.ttf',
            'node_modules/@expo-google-fonts/syne/Syne_700Bold.ttf',
            'node_modules/@expo-google-fonts/syne/Syne_800ExtraBold.ttf',
          ],
        },
      ],
    ],
    extra: {
      eas: {
        projectId: '883d02fd-b126-4404-a7b9-298c9c495b79',
      },
    },
  },
};
