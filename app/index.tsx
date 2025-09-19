/**
 * Écran d'introduction/Splash Screen simplifié
 * Version sans react-native-pager-view pour éviter les dépendances supplémentaires
 */

import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Animated
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import { useLanguage } from '@/context/LanguageContext';
import meditationAnimation from '@/data/Meditation.json';
import meditatingTimeAnimation from '@/data/Meditating Time.json';
import meditatingGirlAnimation from '@/data/Yoga Se Hi hoga.json';

const { width, height } = Dimensions.get('window');

// 🔍 DIAGNOSTIC: Logs pour comprendre les différences de taille
console.log('📱 [DIAGNOSTIC] Dimensions de l\'écran:');
console.log('  - Largeur:', width);
console.log('  - Hauteur:', height);
console.log('  - Ratio:', (width / height).toFixed(2));

// Configuration responsive
const isSmallPhone = height < 700;
const isMediumPhone = height >= 700 && height < 800;
const BASE_UNIT = isSmallPhone ? 4 : isMediumPhone ? 5 : 6;

// 🔍 DIAGNOSTIC: Logs pour la configuration responsive
console.log('📐 [DIAGNOSTIC] Configuration responsive:');
console.log('  - isSmallPhone:', isSmallPhone);
console.log('  - isMediumPhone:', isMediumPhone);
console.log('  - BASE_UNIT calculée:', BASE_UNIT);
console.log('  - Taille Lottie (BASE_UNIT * 20):', BASE_UNIT * 20);
console.log('  - Pourcentage de largeur (50%):', width * 0.5);
console.log('  - Pourcentage de hauteur (25%):', height * 0.25);
// Données des slides d'introduction
const slides = [
  {
    id: 1,
    title: "Réduis le stress ensemble",
    subtitle: "1 minute pour la paix",
    description: "Médite en groupe pour un calme collectif prouvé scientifiquement.",
    lottieSource: meditationAnimation
  },
  {
    id: 2,
    title: " Améliore ta santé mentale",
    subtitle: "Simple et efficace",
    description: "10 minutes par jour pour moins d'anxiété, plus de clarté.",
    lottieSource: meditatingTimeAnimation
  },
  {
    id: 3,
    title: "Renforce ton corps",
    subtitle: "Votre voyage intérieur",
    description: "Médite avec d'autres pour boosté ton immunité et ta vitalité.",
    lottieSource: meditatingGirlAnimation
  }
];

export default function SplashScreen() {
  const router = useRouter();
  const { selectedLanguage } = useLanguage();
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(1));

  console.log('🎬 [SPLASH] Écran d\'introduction affiché');

  const handleNext = () => {
    if (currentPage < slides.length - 1) {
      animateTransition(() => {
        setCurrentPage(currentPage + 1);
        console.log(`📄 [SPLASH] Page suivante: ${currentPage + 2}/${slides.length}`);
      });
    } else {
      handleDone();
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      animateTransition(() => {
        setCurrentPage(currentPage - 1);
        console.log(`📄 [SPLASH] Page précédente: ${currentPage}/${slides.length}`);
      });
    }
  };

  const animateTransition = (callback: () => void) => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      })
    ]).start();
    
    setTimeout(callback, 150);
  };

  const handleSkip = () => {
    console.log('⏭️ [SPLASH] Intro ignorée par l\'utilisateur');
    handleDone();
  };

  const handleDone = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      console.log('✅ [SPLASH] Utilisateur a terminé l\'intro - Marquage comme vu...');
      
      await AsyncStorage.setItem('hasSeenSlider', 'true');
      console.log('💾 [SPLASH] hasSeenSlider sauvegardé avec succès');
      
      setTimeout(() => {
        console.log('🏠 [SPLASH] Redirection vers /(tabs)');
        router.replace('/(tabs)');
      }, 300);
      
    } catch (error) {
      console.error('❌ [SPLASH] Erreur lors de la sauvegarde:', error);
      setIsLoading(false);
    }
  };

  const currentSlide = slides[currentPage];

  return (
    <SafeAreaView style={styles.container}>
      {/* Dégradé d'arrière-plan */}
      <LinearGradient
        colors={['#FFFFFF', '#F8FFFF', '#E8FFFF', '#D0FFFF', '#B0FFFF', '#4DCDCD', '#3BBABA', '#2A9999']}
        locations={[0, 0.005, 0.01, 0.02, 0.05, 0.2, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.backgroundGradient}
      />

      {/* Header avec skip */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Passer</Text>
        </TouchableOpacity>
      </View>

      {/* Contenu principal avec animation */}
      <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
        <View style={styles.slideContent}>
          {/* Animation Lottie pour chaque slide */}
          <LottieView
            source={currentSlide.lottieSource}
            autoPlay
            loop
            style={styles.lottieAnimation}
          />
          
          <View style={styles.textContainer}>
            <Text style={styles.title}>{currentSlide.title}</Text>
            <Text style={styles.subtitle}>{currentSlide.subtitle}</Text>
            <Text style={styles.description}>{currentSlide.description}</Text>
          </View>
        </View>
      </Animated.View>

      {/* Indicateurs de pagination */}
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              currentPage === index && styles.paginationDotActive
            ]}
          />
        ))}
      </View>

      {/* Navigation buttons */}
      <View style={styles.navigation}>
        {currentPage > 0 && (
          <TouchableOpacity onPress={handlePrevious} style={styles.navButton}>
            <Text style={styles.navButtonText}>Précédent</Text>
          </TouchableOpacity>
        )}
        
        <View style={styles.navSpacer} />
        
        <TouchableOpacity 
          onPress={handleNext} 
          style={[styles.navButton, styles.navButtonPrimary]}
          disabled={isLoading}
        >
          <Text style={[styles.navButtonText, styles.navButtonPrimaryText]}>
            {isLoading ? 'Chargement...' : currentPage === slides.length - 1 ? 'Commencer' : 'Suivant'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A9999',
  },
  
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: BASE_UNIT * 4,
    paddingTop: Platform.OS === 'ios' ? BASE_UNIT : BASE_UNIT * 2,
    paddingBottom: BASE_UNIT,
  },

  skipButton: {
    paddingHorizontal: BASE_UNIT * 2,
    paddingVertical: BASE_UNIT,
  },

  skipText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: BASE_UNIT * 2,
    fontWeight: '500',
  },

  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: BASE_UNIT * 4,
  },

  slideContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  textContainer: {
    alignItems: 'center',
    maxWidth: width * 0.85,
  },

  title: {
    fontSize: BASE_UNIT * 6,
    fontWeight: '80',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: BASE_UNIT * 2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },

  subtitle: {
    fontSize: BASE_UNIT * 3,
    fontWeight: '600',
    color: '#E6F3FF',
    textAlign: 'center',
    marginBottom: BASE_UNIT * 3,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  description: {
    fontSize: BASE_UNIT * 2.2,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: BASE_UNIT * 3.2,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  // Animation Lottie
  lottieAnimation: {
    width: width * 0.9,
    height: width * 0.9,
    marginBottom: BASE_UNIT * 3,
  },

  // Styles du logo 3D original (conservés pour restauration future)

  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: BASE_UNIT * 2,
  },

  paginationDot: {
    width: BASE_UNIT * 1.5,
    height: BASE_UNIT * 1.5,
    borderRadius: BASE_UNIT * 0.75,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: BASE_UNIT * 0.5,
  },

  paginationDotActive: {
    backgroundColor: '#FFFFFF',
    width: BASE_UNIT * 3,
  },

  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: BASE_UNIT * 4,
    paddingBottom: BASE_UNIT * 4,
  },

  navSpacer: {
    flex: 1,
  },

  navButton: {
    paddingHorizontal: BASE_UNIT * 4,
    paddingVertical: BASE_UNIT * 2,
    borderRadius: BASE_UNIT * 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },

  navButtonPrimary: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },

  navButtonText: {
    color: '#FFFFFF',
    fontSize: BASE_UNIT * 2.2,
    fontWeight: '600',
  },

  navButtonPrimaryText: {
    color: '#0066CC',
  },
});