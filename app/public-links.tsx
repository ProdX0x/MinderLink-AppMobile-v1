import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Globe } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Header } from '@/components/ui/Header';
import { MeetingLinkList } from '@/components/screens/MeetingLinkList';
import { meetingLinks, getMeetingLinksByCategory } from '@/data/meetingLinks';

/**
 * Écran des liens publics
 * Utilise l'architecture modulaire avec composants réutilisables
 */
export default function PublicLinksScreen() {
  const router = useRouter();
  
  // Obtenir seulement les liens publics
  const publicMeetingLinks = getMeetingLinksByCategory('public');

  // Obtenir uniquement les liens publics
  const publicLinks = getMeetingLinksByCategory('public');

  return (
    <SafeAreaView style={styles.container}>
      {/* Dégradé d'arrière-plan radial turquoise */}
      <LinearGradient
        colors={['#4DCDCD', '#3BBABA', '#2A9999']}
        locations={[0, 0.7, 1]}
        style={styles.backgroundGradient}
      />
      
      <Header
        title="Liens Publics"
        onBackPress={() => router.back()}
      />
      
      <MeetingLinkList
        meetingLinks={publicMeetingLinks}
        emptyStateTitle="Aucun lien public disponible"
        emptyStateMessage="Aucun lien public ne correspond à vos critères de recherche"
        emptyStateIcon={<Globe size={48} color="#CBD5E0" />}
      />
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
});