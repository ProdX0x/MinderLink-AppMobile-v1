/**
 * Composant SessionsList réutilisable
 * Liste de sessions avec filtres et gestion d'état
 */

import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { SessionCard } from '@/components/ui/SessionCard';
import { FilterBar } from '@/components/ui/FilterBar';
import { EmptyState } from '@/components/ui/EmptyState';
import { useSessionFilters } from '@/hooks/useSessionFilters';
import type { Session, DayFilter, LanguageFilter } from '@/types';
import { ZoomService } from '@/services/zoomService';

// Configuration des filtres
const DAYS_FILTERS: DayFilter[] = [
  { id: 'lundi', label: 'Lun' }, // Keep as 'lundi' for now, will be handled by filterSessions
  { id: 'mardi', label: 'Mar' },
  { id: 'mercredi', label: 'Mer' },
  { id: 'jeudi', label: 'Jeu' },
  { id: 'vendredi', label: 'Ven' },
  { id: 'samedi', label: 'Sam' },
  { id: 'dimanche', label: 'Dim' },
];

const LANGUAGE_FILTERS: LanguageFilter[] = [
  { id: 'fr', label: 'Français', flag: '🇫🇷' },
  { id: 'gb', label: 'English', flag: '🇬🇧' },
  { id: 'it', label: 'Italiano', flag: '🇮🇹' },
  { id: 'jp', label: '日本語', flag: '🇯🇵' },
  { id: 'es', label: 'Español', flag: '🇪🇸' },
  { id: 'de', label: 'Deutsch', flag: '🇩🇪' },
];

interface SessionsListProps {
  sessions: Session[];
  onUnlockRequest?: (sessionId: string) => void;
  unlockedSessions?: string[];
  emptyStateTitle?: string;
  emptyStateMessage?: string;
  emptyStateIcon?: React.ReactNode;
}

export const SessionsList: React.FC<SessionsListProps> = ({
  sessions,
  onUnlockRequest,
  unlockedSessions = [],
  emptyStateTitle = 'Aucune session disponible',
  emptyStateMessage = 'Aucune session ne correspond à vos critères de recherche',
  emptyStateIcon,
}) => {
  const [expandedSession, setExpandedSession] = useState<string | null>(null);
  
  const {
    selectedDay,
    selectedLanguage,
    setSelectedDay,
    setSelectedLanguage,
    filteredSessions,
  } = useSessionFilters(sessions);

  const handleSessionPress = (sessionId: string) => {
    setExpandedSession(expandedSession === sessionId ? null : sessionId);
  };

  const handleJoinSession = (session: Session) => {
    ZoomService.joinSession(session);
  };

  const renderSession = ({ item }: { item: Session }) => (
    <SessionCard
      session={item}
      isExpanded={expandedSession === item.id}
      onPress={() => handleSessionPress(item.id)}
      onJoinSession={handleJoinSession}
      isUnlocked={unlockedSessions.includes(item.id)}
      onUnlockRequest={onUnlockRequest}
    />
  );

  return (
    <View style={styles.container}>
      {/* Filtres */}
      <View style={styles.filtersContainer}>
        <FilterBar
          filters={LANGUAGE_FILTERS}
          selectedFilter={selectedLanguage}
          onFilterSelect={setSelectedLanguage}
          allLabel="Toutes langues"
          showIcons={true}
        />
        
        <FilterBar
          filters={DAYS_FILTERS}
          selectedFilter={selectedDay}
          onFilterSelect={setSelectedDay}
          allLabel="Tous les jours"
        />
      </View>

      {/* Liste des sessions */}
      {filteredSessions.length > 0 ? (
        <FlatList
          data={filteredSessions}
          renderItem={renderSession}
          keyExtractor={(item) => item.id}
          style={styles.sessionsList}
          contentContainerStyle={styles.sessionsContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <EmptyState
          title={emptyStateTitle}
          message={emptyStateMessage}
          icon={emptyStateIcon}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filtersContainer: {
    marginBottom: 20,
  },
  sessionsList: {
    flex: 1,
  },
  sessionsContent: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
});