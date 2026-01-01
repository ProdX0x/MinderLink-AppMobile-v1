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
import { Lock, Users, Settings } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AudioPlayer } from '@/components/ui/AudioPlayer';
import { SocialMediaFab } from '@/components/ui/SocialMediaFab';

const { width, height } = Dimensions.get('window');

// ✅ CORRECTION 1: Détection d'écran plus précise
const isSmallPhone = height < 700;
const isMediumPhone = height >= 700 && height < 800;
const isLargePhone = height >= 800;

// ✅ CORRECTION 2: Système d'unités adaptatif optimisé pour smartphones
const getResponsiveUnit = () => {
  if (isSmallPhone) return 4;      // Unités réduites pour petits écrans
  if (isMediumPhone) return 5;     // Unités moyennes
  if (isLargePhone) return 6;      // Unités standard pour grands écrans
  return 5;                        // Fallback
};

const BASE_UNIT = getResponsiveUnit();

// Distribution d'espace optimisée pour smartphones (mise à jour pour le lecteur audio)
const getLayoutDistribution = () => {
  if (isSmallPhone) {
    // Petits écrans: Réduire header, augmenter audio
    return { header: 0.25, action: 0.28, audio: 0.47 };
  }
  if (isMediumPhone) {
    // Écrans moyens: Distribution équilibrée avec audio
    return { header: 0.3, action: 0.28, audio: 0.42 };
  }
  // Grands écrans: Plus d'espace pour header, actions et audio
  return { header: 0.3, action: 0.18, audio: 0.35 };
};

/**
 * Architecture MVVM avec gestion d'état optimisée
 * 
 * HomeScreen Component - Page d'accueil responsive
 * Implémente le pattern MVVM avec:
 * - Model: Configuration responsive et lecteur audio
 * - View: Interface utilisateur adaptative
 * - ViewModel: Logique de présentation et navigation
 */
export default function HomeScreen() {
  const router = useRouter();
  const layout = getLayoutDistribution();

  // ViewModel: Gestion des actions utilisateur
  const handleVipAccess = () => {
    router.push('/vip-auth');
  };

  const handlePublicAccess = () => {
    router.push(`/public-sessions?country=fr`);
  };

  const handleSettingsPress = () => {
    router.push('/settings');
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
        {/* HEADER SECTION - Tailles optimisées */}
        <View style={[styles.headerSection, { minHeight: height * layout.header }]}>
          <View style={styles.logoContainer}>
            <View style={styles.logoWrapper}>
              <View style={styles.sunContainer}>
                {/* Logo 3D original - temporairement masqué */}
                <LinearGradient
                  colors={['#FFE0B3', '#FFC266', '#FF9933', '#E67A00', '#CC5500']}
                  locations={[0, 0.15, 0.4, 0.7, 1]}
                  style={[styles.sun, { display: 'none' }]}
                >
                  <View style={styles.sunHighlight} />
                </LinearGradient>
                
                <LinearGradient
                  colors={['#90EE90', '#32CD32', '#228B22']}
                  locations={[0, 0.5, 1]}
                  style={[styles.greenIndicator, { display: 'none' }]}
                >
                  <View style={styles.greenIndicatorHighlight} />
                </LinearGradient>
                
                <View style={[styles.sunRays, { display: 'none' }]} />
                <View style={[styles.cloud, { display: 'none' }]} />
                <View style={[styles.leaf, { display: 'none' }]} />
                
                {/* Image de remplacement temporaire */}
                <Image
                  source={require('../../assets/images/Logo4peace.png')}
                  style={styles.logoImage}
                />
              </View>
            </View>
          </View>
          
          <View style={styles.titleContainer}>
            <Text style={styles.mainTitle}>1Min4Peace</Text>
            <Text style={styles.subtitle}>Une Chance à la Paix!</Text>
            <View style={styles.titleUnderline} />
          </View>
        </View>

        {/* ACTION SECTION - Boutons optimisés */}
        <View style={[styles.actionSection, { minHeight: height * layout.action }]}>
          <View style={styles.buttonContainer}>
            {/* Bouton Orange VIP - Version 3D Avancée */}
            <TouchableOpacity 
              onPress={handleVipAccess}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#FFE0B3', '#FFC266', '#FF9933', '#E67A00', '#CC5500']}
                locations={[0, 0.15, 0.4, 0.7, 1]}
                style={[styles.accessButton, styles.vipButton]}
              >
                <View style={styles.buttonContent}>
                  <View style={styles.buttonIconContainer}>
                    <Lock size={BASE_UNIT * 4} color="#FFFFFF" />
                  </View>
                  <View style={styles.buttonTextContainer}>
                    <Text style={styles.vipButtonText}>SALLE VIP</Text>
                    <Text style={styles.vipButtonSubtext}>Accès exclusif</Text>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            {/* Bouton Salle Publique - Effet Verre */}
            <TouchableOpacity 
              onPress={handlePublicAccess}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={[
                  'rgba(255, 255, 255, 0.3)',
                  'rgba(42, 153, 153, 0.35)',
                  'rgba(42, 153, 153, 0.45)',
                  'rgba(32, 123, 123, 0.5)'
                ]}
                locations={[0, 0.2, 0.5, 0.8]}
                style={[styles.accessButton, styles.publicButton]}
              >
                <View style={styles.buttonContent}>
                  <View style={styles.buttonIconContainer}>
                    <Users size={BASE_UNIT * 4} color="#FFFFFF" />
                  </View>
                  <View style={styles.buttonTextContainer}>
                    <Text style={styles.publicButtonText}>SALLE PUBLIQUE</Text>
                    <Text style={styles.publicButtonSubtext}>Accès libre</Text>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* AUDIO SECTION - Lecteur de méditation */}
        <View style={[styles.audioSection, { minHeight: height * layout.audio }]}>
          <AudioPlayer
            audioUrl="https://1min4peace.org/wp-content/uploads/2015/02/1min4peace_FRE.mp3?_=1"
            title="Méditation pour la paix"
          />
        </View>
      </ScrollView>
      
      {/* Bouton de réseaux sociaux flottant */}
      <SocialMediaFab />
      
      {/* Bouton de réglages flottant */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={handleSettingsPress}
        activeOpacity={0.8}
        accessibilityLabel="Réglages"
        accessibilityHint="Ouvrir les paramètres de l'application"
        accessibilityRole="button"
      >
        <LinearGradient
          colors={[
            'rgba(255, 255, 255, 0.4)',
            'rgba(176, 255, 255, 0.7)',
            'rgba(77, 205, 205, 0.8)',
            'rgba(42, 153, 153, 0.9)'
          ]}
          locations={[0, 0.3, 0.7, 1]}
          style={styles.floatingButtonGradient}
        >
          <Settings size={BASE_UNIT * 3.5} color="#FFFFFF" />
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

/**
 * STYLESHEET CORRIGÉ - Responsive parfait pour smartphones
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  
  // Dégradé d'arrière-plan radial
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

  // HEADER SECTION - Tailles adaptatives optimisées
  headerSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: BASE_UNIT * 2,
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

  // Image de remplacement temporaire
  logoImage: {
    width: BASE_UNIT * 18,
    height: BASE_UNIT * 18,
    resizeMode: 'contain',
  },

  // Styles du logo 3D original (conservés pour restauration future)
  sun: {
    width: BASE_UNIT * 12,
    height: BASE_UNIT * 12,
    borderRadius: BASE_UNIT * 6,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF9933',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
  },

  sunHighlight: {
    width: BASE_UNIT * 4,
    height: BASE_UNIT * 4,
    borderRadius: BASE_UNIT * 2,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    position: 'absolute',
    top: BASE_UNIT * 2,
    left: BASE_UNIT * 3,
  },

  greenIndicator: {
    width: BASE_UNIT * 3,
    height: BASE_UNIT * 3,
    borderRadius: BASE_UNIT * 1.5,
    position: 'absolute',
    top: BASE_UNIT * 2,
    right: BASE_UNIT * 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#32CD32',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  greenIndicatorHighlight: {
    width: BASE_UNIT,
    height: BASE_UNIT,
    borderRadius: BASE_UNIT * 0.5,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },

  sunRays: {
    position: 'absolute',
    width: BASE_UNIT * 20,
    height: BASE_UNIT * 20,
    borderRadius: BASE_UNIT * 10,
    borderWidth: 2,
    borderColor: 'rgba(255, 153, 51, 0.3)',
    borderStyle: 'dashed',
  },

  cloud: {
    position: 'absolute',
    top: -BASE_UNIT * 2,
    left: -BASE_UNIT * 3,
    width: BASE_UNIT * 6,
    height: BASE_UNIT * 3,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: BASE_UNIT * 1.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  leaf: {
    position: 'absolute',
    bottom: -BASE_UNIT,
    right: -BASE_UNIT * 2,
    width: BASE_UNIT * 2,
    height: BASE_UNIT * 3,
    backgroundColor: '#90EE90',
    borderRadius: BASE_UNIT,
    transform: [{ rotate: '45deg' }],
    shadowColor: '#32CD32',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
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

  // ACTION SECTION - Boutons adaptatifs optimisés
  actionSection: {
    justifyContent: 'center',
    paddingVertical: BASE_UNIT,
  },

  buttonContainer: {
    gap: BASE_UNIT * 3,
  },

  accessButton: {
    borderRadius: BASE_UNIT * 2.5,
    paddingVertical: BASE_UNIT * 3,
    paddingHorizontal: BASE_UNIT * 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
    position: 'relative',
    overflow: 'hidden',
  },

  vipButton: {
    // Le dégradé est maintenant géré par LinearGradient
    shadowColor: 'rgba(42, 153, 153, 0.25)',
  },

  publicButton: {
    // Le dégradé est maintenant géré par LinearGradient
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    shadowColor: 'rgba(42, 153, 153, 0.2)',
  },

  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonIconContainer: {
    marginRight: BASE_UNIT * 2.5,
    padding: BASE_UNIT * 1.5,
    borderRadius: BASE_UNIT * 2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },

  buttonTextContainer: {
    alignItems: 'flex-start',
  },

  vipButtonText: {
    fontSize: BASE_UNIT * 3,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
  },

  vipButtonSubtext: {
    fontSize: BASE_UNIT * 1.8,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '400',
    marginTop: 2,
  },

  publicButtonText: {
    fontSize: BASE_UNIT * 3,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
  },

  publicButtonSubtext: {
    fontSize: BASE_UNIT * 1.8,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '400',
    marginTop: 2,
  },

  // AUDIO SECTION - Lecteur de méditation
  audioSection: {
    justifyContent: 'flex-start',
    paddingTop: BASE_UNIT,
  },

  // BOUTON DE RÉGLAGES FLOTTANT - Design harmonieux
  floatingButton: {
    position: 'absolute',
    bottom: BASE_UNIT * 4,
    left: BASE_UNIT * 4,
    width: BASE_UNIT * 10,
    height: BASE_UNIT * 10,
    borderRadius: BASE_UNIT * 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },

  floatingButtonGradient: {
    width: '100%',
    height: '100%',
    borderRadius: BASE_UNIT * 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
});