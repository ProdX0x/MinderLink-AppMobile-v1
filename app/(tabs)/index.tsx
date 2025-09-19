import React from 'react';
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
import { Settings, Calendar } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SocialMediaFab } from '@/components/ui/SocialMediaFab';
import { MeetingLinkList } from '@/components/screens/MeetingLinkList';
import { meetingLinks, getTodayMeetingLinks } from '@/data/meetingLinks';

const { width, height } = Dimensions.get('window');

// Configuration responsive
const isSmallPhone = height < 700;
const isMediumPhone = height >= 700 && height < 800;
const isLargePhone = height >= 800;

const getResponsiveUnit = () => {
  if (isSmallPhone) return 4;
  if (isMediumPhone) return 5;
  if (isLargePhone) return 6;
  return 5;
};

const BASE_UNIT = getResponsiveUnit();

/**
 * Architecture MVVM avec gestion d'état optimisée
 * 
 * HomeScreen Component - Page d'accueil avec réunions du jour
 * Implémente le pattern MVVM avec:
 * - Model: Configuration responsive et données de réunions
 * - View: Interface utilisateur adaptative
 * - ViewModel: Logique de présentation et navigation
 */
export default function HomeScreen() {
  const router = useRouter();
  
  // Obtenir les réunions d'aujourd'hui
  const todayMeetings = getTodayMeetingLinks();

  // ViewModel: Gestion des actions utilisateur
  const handleSettingsPress = () => {
    router.push('/settings');
  };

  const handleViewAllMeetings = () => {
    router.push('/public-links');
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
        {/* HEADER SECTION - Titre et logo */}
        <View style={styles.headerSection}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/Logo4peace.png')}
              style={styles.logoImage}
            />
          </View>
          
          <View style={styles.titleContainer}>
            <Text style={styles.mainTitle}>MinderLink</Text>
            <Text style={styles.subtitle}>Gère tes liens de réunion!</Text>
            <View style={styles.titleUnderline} />
          </View>
        </View>

        {/* TODAY'S MEETINGS SECTION */}
        <View style={styles.meetingsSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Calendar size={24} color="#2D3748" />
              <Text style={styles.sectionTitle}>Réunions d'aujourd'hui</Text>
            </View>
            
            {todayMeetings.length > 0 && (
              <TouchableOpacity 
                onPress={handleViewAllMeetings}
                style={styles.viewAllButton}
                activeOpacity={0.7}
              >
                <Text style={styles.viewAllText}>Voir tout</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Liste des réunions d'aujourd'hui */}
          <View style={styles.meetingListContainer}>
            <MeetingLinkList
              meetingLinks={todayMeetings}
              showFilters={false}
              defaultToToday={true}
              emptyStateTitle="Aucune réunion aujourd'hui"
              emptyStateMessage="Vous n'avez aucune réunion prévue pour aujourd'hui. Profitez de cette journée libre!"
              emptyStateIcon={<Calendar size={48} color="#CBD5E0" />}
            />
          </View>
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
 * STYLESHEET - Responsive parfait pour smartphones
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

  // HEADER SECTION
  headerSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: BASE_UNIT * 2,
    marginBottom: BASE_UNIT * 3,
  },

  logoContainer: {
    marginBottom: BASE_UNIT * 3,
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

  // MEETINGS SECTION
  meetingsSection: {
    flex: 1,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: BASE_UNIT * 3,
    paddingHorizontal: BASE_UNIT * 2,
  },

  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  sectionTitle: {
    fontSize: BASE_UNIT * 3,
    fontWeight: '600',
    color: '#2D3748',
    marginLeft: BASE_UNIT * 2,
  },

  viewAllButton: {
    paddingHorizontal: BASE_UNIT * 3,
    paddingVertical: BASE_UNIT * 1.5,
    borderRadius: BASE_UNIT * 4,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },

  viewAllText: {
    fontSize: BASE_UNIT * 2,
    fontWeight: '500',
    color: '#4299E1',
  },

  meetingListContainer: {
    flex: 1,
    minHeight: height * 0.5,
  },

  // BOUTON DE RÉGLAGES FLOTTANT
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