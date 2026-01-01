import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, ActivityIndicator, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Globe } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Header } from '@/components/ui/Header';
import { MeetingLinkList } from '@/components/screens/MeetingLinkList';
import { useMeetings } from '@/hooks/useMeetings';
import type { UpdateMeetingInput } from '@/types';

/**
 * Écran des liens publics
 * Utilise Supabase et permet l'édition des réunions
 */
export default function PublicLinksScreen() {
  const router = useRouter();

  // Utiliser le hook Supabase pour récupérer les meetings
  const { meetingLinks, isLoading, error, refetch, updateMeeting } = useMeetings({
    type: 'meeting',
    category: 'public',
  });

  const handleEditMeeting = async (data: UpdateMeetingInput) => {
    await updateMeeting(data);
    await refetch();
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#4DCDCD', '#3BBABA', '#2A9999']}
          locations={[0, 0.7, 1]}
          style={styles.backgroundGradient}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.loadingText}>Chargement des réunions...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#4DCDCD', '#3BBABA', '#2A9999']}
          locations={[0, 0.7, 1]}
          style={styles.backgroundGradient}
        />
        <Header title="Liens Publics" onBackPress={() => router.back()} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Erreur: {error.message}</Text>
        </View>
      </SafeAreaView>
    );
  }

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
        meetingLinks={meetingLinks}
        emptyStateTitle="Aucun lien public disponible"
        emptyStateMessage="Aucun lien public ne correspond à vos critères de recherche"
        emptyStateIcon={<Globe size={48} color="#CBD5E0" />}
        onEditMeeting={handleEditMeeting}
        enableEditing={true}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
});