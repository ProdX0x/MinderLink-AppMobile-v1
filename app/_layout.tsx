/**
 * Layout principal de l'application
 * Point d'entrée qui gère la navigation initiale
 */

import { useEffect, useState } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LanguageProvider } from '@/context/LanguageContext';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

// Empêcher le splash screen de se cacher automatiquement
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const router = useRouter();
  const segments = useSegments();
  const [isNavigationReady, setIsNavigationReady] = useState(false);
  const [initialRouteDetermined, setInitialRouteDetermined] = useState(false);

  const [fontsLoaded] = useFonts({
    // Ajoutez vos polices personnalisées ici si nécessaire
  });

  // Détermination de la route initiale
  useEffect(() => {
    if (fontsLoaded && !initialRouteDetermined) {
      determineInitialRoute();
    }
  }, [fontsLoaded, initialRouteDetermined]);

  const determineInitialRoute = async () => {
    try {
      console.log('🚀 [ROOT-LAYOUT] Détermination de la route initiale...');
      
      // TEMPORAIRE - Décommentez pour reset (pour les tests)
      await AsyncStorage.removeItem('hasSeenSlider');
      await AsyncStorage.removeItem('selectedLanguage');
      console.log('🔄 [ROOT-LAYOUT] Données réinitialisées pour les tests');

      // Vérifier la langue sélectionnée
      const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');
      console.log('🌍 [ROOT-LAYOUT] Langue stockée:', selectedLanguage);
      
      // Vérifier si l'intro a été vue
      const hasSeenSlider = await AsyncStorage.getItem('hasSeenSlider');
      console.log('👁️ [ROOT-LAYOUT] A vu l\'intro:', hasSeenSlider);

      let targetRoute = '/';

      // Logique de navigation :
      if (!selectedLanguage) {
        console.log('📍 [ROOT-LAYOUT] Aucune langue → Sélection de langue');
        targetRoute = '/language-select';
      } else if (hasSeenSlider !== 'true') {
        console.log('📍 [ROOT-LAYOUT] Langue OK, intro pas vue → Splash screen');
        targetRoute = '/';  // Le splash screen est à la racine
      } else {
        console.log('📍 [ROOT-LAYOUT] Tout OK → Écran principal');
        targetRoute = '/(tabs)';
      }

      // Navigation vers la route déterminée
      if (segments.length === 0 || segments[0] !== targetRoute.replace('/', '')) {
        console.log('🎯 [ROOT-LAYOUT] Navigation vers:', targetRoute);
        router.replace(targetRoute as any);
      }

      setInitialRouteDetermined(true);
      await SplashScreen.hideAsync();
      
    } catch (error) {
      console.error('❌ [ROOT-LAYOUT] Erreur lors de la détermination:', error);
      // En cas d'erreur, aller vers la sélection de langue par sécurité
      router.replace('/language-select');
      setInitialRouteDetermined(true);
      await SplashScreen.hideAsync();
    }
  };

  // Ne pas rendre l'interface tant que tout n'est pas prêt
  if (!fontsLoaded || !initialRouteDetermined) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="language-select" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="public-sessions" />
      <Stack.Screen name="vip-sessions" />
      <Stack.Screen name="vip-auth" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  useFrameworkReady();

  return (
    <LanguageProvider>
      <RootLayoutNav />
      <StatusBar style="auto" />
    </LanguageProvider>
  );
}