import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Switch,
  Linking,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Globe, Bell, Info, ExternalLink } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Header } from '@/components/ui/Header';
import { useResponsive } from '@/hooks/useResponsive';

// Configuration des langues disponibles
const AVAILABLE_LANGUAGES = [
  { id: 'fr', name: 'Français', flag: '🇫🇷' },
  { id: 'en', name: 'English', flag: '🇬🇧' },
  { id: 'it', name: 'Italiano', flag: '🇮🇹' },
  { id: 'ja', name: '日本語', flag: '🇯🇵' },
  { id: 'es', name: 'Español', flag: '🇪🇸' },
  { id: 'de', name: 'Deutsch', flag: '🇩🇪' },
];

export default function SettingsScreen() {
  const router = useRouter();
  const { fontSizes, spacing, baseUnit } = useResponsive();
  
  // États pour les réglages
  const [selectedLanguage, setSelectedLanguage] = useState('fr');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleLanguageSelect = (languageId: string) => {
    setSelectedLanguage(languageId);
    // TODO: Implémenter la logique de changement de langue
    Alert.alert(
      'Langue sélectionnée',
      `La langue ${AVAILABLE_LANGUAGES.find(l => l.id === languageId)?.name} sera appliquée prochainement.`,
      [{ text: 'OK', style: 'default' }]
    );
  };

  const handleNotificationToggle = (value: boolean) => {
    setNotificationsEnabled(value);
    // TODO: Implémenter la logique de gestion des notifications
  };

  const handleLinkPress = async (url: string, linkName: string) => {
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        Alert.alert(
          'Erreur',
          `Impossible d'ouvrir le lien ${linkName}`,
          [{ text: 'OK', style: 'default' }]
        );
      }
    } catch (error) {
      console.error('Erreur lors de l\'ouverture du lien:', error);
      Alert.alert(
        'Erreur',
        `Une erreur est survenue lors de l'ouverture du lien ${linkName}`,
        [{ text: 'OK', style: 'default' }]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Dégradé d'arrière-plan harmonieux */}
      <LinearGradient
        colors={['#4DCDCD', '#3BBABA', '#2A9999']}
        locations={[0, 0.7, 1]}
        style={styles.backgroundGradient}
      />
      
      <Header
        title="Réglages Système"
        onBackPress={() => router.back()}
      />
      
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Section 1: Changement de langue */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Globe size={24} color="#2D3748" />
            <Text style={[styles.sectionTitle, { fontSize: fontSizes.lg }]}>
              Langue de l'application
            </Text>
          </View>
          
          <View style={styles.sectionContent}>
            <Text style={[styles.sectionDescription, { fontSize: fontSizes.sm }]}>
              Sélectionnez la langue de l'interface de l'application
            </Text>
            
            <View style={styles.languageList}>
              {AVAILABLE_LANGUAGES.map((language) => (
                <TouchableOpacity
                  key={language.id}
                  style={[
                    styles.languageItem,
                    selectedLanguage === language.id && styles.languageItemSelected
                  ]}
                  onPress={() => handleLanguageSelect(language.id)}
                  activeOpacity={0.7}
                  accessibilityLabel={`Sélectionner ${language.name}`}
                  accessibilityRole="button"
                  accessibilityState={{ selected: selectedLanguage === language.id }}
                >
                  <View style={styles.languageContent}>
                    <Text style={styles.languageFlag}>{language.flag}</Text>
                    <Text style={[
                      styles.languageName,
                      { fontSize: fontSizes.md },
                      selectedLanguage === language.id && styles.languageNameSelected
                    ]}>
                      {language.name}
                    </Text>
                  </View>
                  {selectedLanguage === language.id && (
                    <View style={styles.selectedIndicator} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Section 2: Notifications */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Bell size={24} color="#2D3748" />
            <Text style={[styles.sectionTitle, { fontSize: fontSizes.lg }]}>
              Notifications
            </Text>
          </View>
          
          <View style={styles.sectionContent}>
            <Text style={[styles.sectionDescription, { fontSize: fontSizes.sm }]}>
              Gérez les notifications de l'application
            </Text>
            
            <View style={styles.notificationItem}>
              <View style={styles.notificationContent}>
                <Text style={[styles.notificationTitle, { fontSize: fontSizes.md }]}>
                  Notifications push
                </Text>
                <Text style={[styles.notificationDescription, { fontSize: fontSizes.sm }]}>
                  Recevez des rappels pour vos sessions de méditation
                </Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={handleNotificationToggle}
                trackColor={{ false: '#E2E8F0', true: '#48BB78' }}
                thumbColor={notificationsEnabled ? '#FFFFFF' : '#CBD5E0'}
                accessibilityLabel="Activer ou désactiver les notifications"
                accessibilityRole="switch"
              />
            </View>
          </View>
        </View>

        {/* Section 3: À propos */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Info size={24} color="#2D3748" />
            <Text style={[styles.sectionTitle, { fontSize: fontSizes.lg }]}>
              À propos
            </Text>
          </View>
          
          <View style={styles.sectionContent}>
            <View style={styles.aboutItem}>
              <Text style={[styles.aboutLabel, { fontSize: fontSizes.sm }]}>
                Version de l'application
              </Text>
              <Text style={[styles.aboutValue, { fontSize: fontSizes.md }]}>
                v1.0.0
              </Text>
            </View>
            
            <View style={styles.aboutItem}>
              <Text style={[styles.aboutLabel, { fontSize: fontSizes.sm }]}>
                Concepteur
              </Text>
              <Text style={[styles.aboutValue, { fontSize: fontSizes.md }]}>
                Stéphane Steve SAULNIER
              </Text>
            </View>
            
            <View style={styles.aboutItem}>
              <Text style={[styles.aboutLabel, { fontSize: fontSizes.sm }]}>
                Mission
              </Text>
              <Text style={[styles.aboutDescription, { fontSize: fontSizes.sm }]}>
                One Minute For Peace : une minute pour la paix intérieure et collective
              </Text>
            </View>
            
            <View style={styles.linksContainer}>
              <TouchableOpacity
                style={styles.linkItem}
                onPress={() => handleLinkPress(
                  'https://tidy-buddy-promotion-btmh.bolt.host/privacy',
                  'Politique de confidentialité'
                )}
                activeOpacity={0.7}
                accessibilityLabel="Ouvrir la politique de confidentialité"
                accessibilityRole="button"
              >
                <Text style={[styles.linkText, { fontSize: fontSizes.sm }]}>
                  Politique de confidentialité
                </Text>
                <ExternalLink size={16} color="#4299E1" />
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.linkItem}
                onPress={() => handleLinkPress(
                  'https://tidy-buddy-promotion-btmh.bolt.host/terms',
                  'Conditions d\'utilisation'
                )}
                activeOpacity={0.7}
                accessibilityLabel="Ouvrir les conditions d'utilisation"
                accessibilityRole="button"
              >
                <Text style={[styles.linkText, { fontSize: fontSizes.sm }]}>
                  Conditions d'utilisation
                </Text>
                <ExternalLink size={16} color="#4299E1" />
              </TouchableOpacity>
            </View>
          </View>
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
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  
  // Sections
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  sectionTitle: {
    fontWeight: '600',
    color: '#2D3748',
    marginLeft: 12,
  },
  sectionContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionDescription: {
    color: '#718096',
    marginBottom: 16,
    lineHeight: 20,
  },
  
  // Langues
  languageList: {
    gap: 8,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(247, 250, 252, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.6)',
  },
  languageItemSelected: {
    backgroundColor: 'rgba(72, 187, 120, 0.1)',
    borderColor: '#48BB78',
  },
  languageContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageFlag: {
    fontSize: 20,
    marginRight: 12,
  },
  languageName: {
    fontWeight: '500',
    color: '#4A5568',
  },
  languageNameSelected: {
    color: '#2D3748',
    fontWeight: '600',
  },
  selectedIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#48BB78',
  },
  
  // Notifications
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(247, 250, 252, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.6)',
  },
  notificationContent: {
    flex: 1,
    marginRight: 16,
  },
  notificationTitle: {
    fontWeight: '500',
    color: '#2D3748',
    marginBottom: 4,
  },
  notificationDescription: {
    color: '#718096',
    lineHeight: 18,
  },
  
  // À propos
  aboutItem: {
    marginBottom: 16,
  },
  aboutLabel: {
    fontWeight: '500',
    color: '#4A5568',
    marginBottom: 4,
  },
  aboutValue: {
    fontWeight: '600',
    color: '#2D3748',
  },
  aboutDescription: {
    color: '#718096',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  linksContainer: {
    marginTop: 8,
    gap: 12,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(66, 153, 225, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(66, 153, 225, 0.2)',
  },
  linkText: {
    color: '#4299E1',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});