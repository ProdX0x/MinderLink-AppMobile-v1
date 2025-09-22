/**
 * Écran de sélection de langue
 * Permet à l'utilisateur de choisir la langue de l'application au démarrage
 */

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  Dimensions,
  Platform,
  ScrollView,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useLanguage } from '@/context/LanguageContext';
import { GlassmorphicContainer } from '@/components/ui/GlassmorphicContainer';

const { width, height } = Dimensions.get('window');

// Détection d'écran plus précise
const isSmallPhone = height < 700;
const isMediumPhone = height >= 700 && height < 800;
const isLargePhone = height >= 800;

// Système d'unités adaptatif optimisé pour smartphones
const getResponsiveUnit = () => {
  if (isSmallPhone) return 4;
  if (isMediumPhone) return 5;
  if (isLargePhone) return 6;
  return 5;
};

const BASE_UNIT = getResponsiveUnit();

// Configuration de grille responsive
const getGridColumns = () => {
  if (width < 350) return 2;
  return 3;
};

const getGridItemSize = () => {
  const columns = getGridColumns();
  const horizontalPadding = BASE_UNIT * 8;
  const itemSpacing = BASE_UNIT * 2 * (columns - 1);
  const availableWidth = width - horizontalPadding - itemSpacing;
  const itemWidth = availableWidth / columns;
  
  const maxItemHeight = BASE_UNIT * 16;
  const calculatedHeight = Math.min(itemWidth * 1.0, maxItemHeight);
  
  return {
    width: itemWidth,
    height: calculatedHeight
  };
};

// Données des pays pour la sélection de langue
const countries = [
  { id: 'fr', flag: '🇫🇷', name: 'Français' },
  { id: 'gb', flag: '🇬🇧', name: 'English' },
  { id: 'it', flag: '🇮🇹', name: 'Italiano' },
  { id: 'jp', flag: '🇯🇵', name: '日本語' },
  { id: 'es', flag: '🇪🇸', name: 'Español' },
  { id: 'de', flag: '🇩🇪', name: 'Deutsch' },
];

export default function LanguageSelectScreen() {
  const router = useRouter();
  const { setLanguage } = useLanguage();
  const [selectedLanguageId, setSelectedLanguageId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const gridItemSize = getGridItemSize();

  const handleLanguageSelect = async (languageId: string) => {
    if (isLoading) return;
    
    console.log('🌍 [LANGUAGE-SELECT] Langue sélectionnée:', languageId);
    setSelectedLanguageId(languageId);
    setIsLoading(true);
    
    try {
      console.log('💾 [LANGUAGE-SELECT] Sauvegarde de la langue...');
      await setLanguage(languageId);
      console.log('✅ [LANGUAGE-SELECT] Langue sauvegardée avec succès');
      // Petit délai pour l'animation
      setTimeout(() => {
        console.log('🎬 [LANGUAGE-SELECT] Redirection vers / (splash screen)');
        router.replace('/');
      }, 500);
    } catch (error) {
      console.error('Erreur lors de la sélection de la langue:', error);
      console.log('⚠️ [LANGUAGE-SELECT] Erreur de sauvegarde - Reset de l\'état');
      setIsLoading(false);
      setSelectedLanguageId(null);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Dégradé d'arrière-plan radial turquoise */}
      <LinearGradient
        colors={['#FFFFFF', '#F8FFFF', '#E8FFFF', '#D0FFFF', '#B0FFFF', '#4DCDCD', '#3BBABA', '#2A9999']}
        locations={[0, 0.005, 0.01, 0.02, 0.05, 0.2, 0.5, 1]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.backgroundGradient}
      />
      
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.logoContainer}>
            <View style={styles.logoWrapper}>
              <View style={styles.sunContainer}>
                <Image
                  source={require('../assets/images/Logo4peace.png')}
                  style={styles.logoImage}
                />
              </View>
            </View>
          </View>
          
          <View style={styles.titleContainer}>
            <Text style={styles.mainTitle}>MinderLink</Text>
            <Text style={styles.subtitle}>Choisissez votre langue</Text>
            <View style={styles.titleUnderline} />
          </View>
        </View>

        {/* Language Selection Section */}
        <View style={styles.languageSection}>
          <View style={styles.languageHeader}>
            <Text style={styles.sectionTitle}>Choix de Langues</Text>
            <View style={styles.sectionDivider} />
          </View>
          
          <View style={styles.flagsContainer}>
            <View style={styles.flagsGrid}>
              {countries.map((country) => (
                <TouchableOpacity
                  key={country.id}
                  onPress={() => handleLanguageSelect(country.id)}
                  activeOpacity={0.7}
                  disabled={isLoading}
                  style={[
                    {
                      width: gridItemSize.width,
                      height: gridItemSize.height,
                    }
                  ]}
                >
                  {selectedLanguageId === country.id ? (
                    <LinearGradient
                      colors={['#FFE0B3', '#FFC266', '#FF9933', '#E67A00', '#CC5500']}
                      locations={[0, 0.15, 0.4, 0.7, 1]}
                      style={[
                        styles.flagButton,
                        styles.flagButtonSelected
                      ]}
                    >
                      <View style={styles.flagContent}>
                        <Text style={styles.flagEmoji}>{country.flag}</Text>
                        <Text 
                          style={[
                            styles.flagName,
                            styles.flagNameSelected
                          ]} 
                          numberOfLines={1}
                        >
                          {country.name}
                        </Text>
                      </View>
                    </LinearGradient>
                  ) : (
                    <GlassmorphicContainer
                      style={styles.flagButton}
                      intensity={15}
                      gradientColors={[
                        'rgba(255, 255, 255, 0.3)',
                        'rgba(42, 153, 153, 0.2)',
                        'rgba(32, 123, 123, 0.25)'
                      ]}
                      borderRadius={BASE_UNIT * 2}
                      borderColor="rgba(255, 255, 255, 0.3)"
                      borderWidth={1}
                      shadowIntensity="medium"
                    >
                      <View style={styles.flagContent}>
                        <Text style={styles.flagEmoji}>{country.flag}</Text>
                        <Text 
                          style={styles.flagName} 
                          numberOfLines={1}
                        >
                          {country.name}
                        </Text>
                      </View>
                    </GlassmorphicContainer>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <Text style={styles.languageHint}>
            {isLoading ? 'Configuration en cours...' : 'Sélectionnez votre langue préférée'}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  
  scrollContainer: {
    flex: 1,
  },
  
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: BASE_UNIT * 4,
    paddingTop: Platform.OS === 'ios' ? BASE_UNIT * 2 : BASE_UNIT * 3,
    paddingBottom: BASE_UNIT * 4,
  },

  // Header Section
  headerSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: BASE_UNIT * 2,
    flex: 0.4,
  },

  logoContainer: {
    marginBottom: BASE_UNIT * 3,
  },

  logoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  sunContainer: {
    width: BASE_UNIT * 16,
    height: BASE_UNIT * 16,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  logoImage: {
    width: BASE_UNIT * 18,
    height: BASE_UNIT * 18,
    resizeMode: 'contain',
  },

  titleContainer: {
    alignItems: 'center',
  },

  mainTitle: {
    fontSize: BASE_UNIT * 6,
    fontWeight: '800',
    color: '#2D3748',
    letterSpacing: BASE_UNIT * 0.3,
    marginBottom: BASE_UNIT,
  },

  subtitle: {
    fontSize: BASE_UNIT * 2.2,
    color: '#FFFFFF',
    fontStyle: 'italic',
    fontWeight: '500',
    letterSpacing: 0.5,
    marginBottom: BASE_UNIT,
    textAlign: 'center',
  },

  titleUnderline: {
    width: BASE_UNIT * 12,
    height: 2,
    backgroundColor: '#2D3748',
    borderRadius: 1,
    opacity: 0.6,
  },

  // Language Section
  languageSection: {
    flex: 0.6,
    justifyContent: 'flex-start',
    paddingTop: BASE_UNIT * 2,
  },

  languageHeader: {
    alignItems: 'center',
    marginBottom: BASE_UNIT * 3,
  },

  sectionTitle: {
    fontSize: BASE_UNIT * 2.5,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: BASE_UNIT * 1.5,
  },

  sectionDivider: {
    width: BASE_UNIT * 15,
    height: 1,
    backgroundColor: '#E2E8F0',
  },

  flagsContainer: {
    flex: 1,
    marginBottom: BASE_UNIT * 2,
  },

  flagsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  flagButton: {
    marginBottom: BASE_UNIT * 2,
    flex: 1,
  },

  flagButtonSelected: {
    borderRadius: BASE_UNIT * 2,
    shadowColor: '#F4A460',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },

  flagContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: BASE_UNIT * 1.5,
  },

  flagEmoji: {
    fontSize: BASE_UNIT * 6,
    marginBottom: BASE_UNIT * 0.8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },

  flagName: {
    fontSize: BASE_UNIT * 2.5,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },

  flagNameSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  languageHint: {
    fontSize: BASE_UNIT * 1.5,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: BASE_UNIT,
    paddingBottom: BASE_UNIT * 2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});