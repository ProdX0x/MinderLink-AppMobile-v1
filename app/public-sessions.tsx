import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Users } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Header } from '@/components/ui/Header';
import { SessionsList } from '@/components/screens/SessionsList';
import { publicSessions } from '@/data/sessions';


/**
 * Écran des sessions publiques
 * Utilise l'architecture modulaire avec composants réutilisables
 */
export default function PublicSessionsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Dégradé d'arrière-plan radial turquoise */}
      <LinearGradient
        colors={['#4DCDCD', '#3BBABA', '#2A9999']}
        locations={[0, 0.7, 1]}
        style={styles.backgroundGradient}
      />
      
      <Header
        title="Sessions Publiques"
        onBackPress={() => router.back()}
      />
      
      <SessionsList
        sessions={publicSessions}
        emptyStateTitle="Aucune session publique disponible"
        emptyStateMessage="Aucune session publique ne correspond à vos critères de recherche"
        emptyStateIcon={<Users size={48} color="#CBD5E0" />}
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