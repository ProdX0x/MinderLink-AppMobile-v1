import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Modal, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Lock } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Header } from '@/components/ui/Header';
import { MeetingLinkList } from '@/components/screens/MeetingLinkList';
import { Button } from '@/components/ui/Button';
import { meetingLinks, getMeetingLinksByCategory } from '@/data/meetingLinks';

/**
 * Écran des liens privés
 * Utilise l'architecture modulaire avec gestion d'authentification
 */
export default function PrivateLinksScreen() {
  const router = useRouter();
  const [unlockedMeetingLinks, setUnlockedMeetingLinks] = useState<string[]>([]);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentMeetingLinkId, setCurrentMeetingLinkId] = useState<string | null>(null);
  const [passwordInput, setPasswordInput] = useState('');

  // Obtenir seulement les liens privés
  const privateMeetingLinks = getMeetingLinksByCategory('private');

  const handleUnlockRequest = (meetingLinkId: string) => {
    setCurrentMeetingLinkId(meetingLinkId);
    setShowPasswordModal(true);
  };

  const handlePasswordSubmit = () => {
    if (passwordInput === '661' && currentMeetingLinkId) {
      setUnlockedMeetingLinks([...unlockedMeetingLinks, currentMeetingLinkId]);
      setShowPasswordModal(false);
      setPasswordInput('');
      setCurrentMeetingLinkId(null);
    } else {
      Alert.alert(
        'Accès refusé',
        'Le mot de passe saisi est incorrect.',
        [{ text: 'OK', style: 'default' }]
      );
      setPasswordInput('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Dégradé d'arrière-plan radial turquoise */}
      <LinearGradient
        colors={['#4DCDCD', '#3BBABA', '#2A9999']}
        locations={[0, 0.7, 1]}
        style={styles.backgroundGradient}
      />
      
      <Header
        title="Liens Privés"
        onBackPress={() => router.back()}
      />
      
      <MeetingLinkList
        meetingLinks={privateMeetingLinks}
        onUnlockRequest={handleUnlockRequest}
        unlockedMeetingLinks={unlockedMeetingLinks}
        emptyStateTitle="Aucun lien privé disponible"
        emptyStateMessage="Aucun lien privé ne correspond à vos critères de recherche"
        emptyStateIcon={<Lock size={48} color="#CBD5E0" />}
      />

      {/* Modal de saisie du mot de passe */}
      <Modal
        visible={showPasswordModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowPasswordModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Accès requis</Text>
            <Text style={styles.modalSubtitle}>
              Entrez le mot de passe pour révéler les informations du lien
            </Text>
            
            <TextInput
              style={styles.passwordModalInput}
              value={passwordInput}
              onChangeText={setPasswordInput}
              placeholder="Mot de passe"
              secureTextEntry
              keyboardType="numeric"
              onSubmitEditing={handlePasswordSubmit}
            />
            
            <View style={styles.modalButtons}>
              <Button
                title="Annuler"
                onPress={() => {
                  setShowPasswordModal(false);
                  setPasswordInput('');
                  setCurrentMeetingLinkId(null);
                }}
                variant="outline"
                style={styles.modalButton}
              />
              
              <Button
                title="Valider"
                onPress={handlePasswordSubmit}
                variant="primary"
                style={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 24,
    width: '85%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  passwordModalInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  modalButton: {
    flex: 1,
  },
});