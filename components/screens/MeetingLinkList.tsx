/**
 * Composant MeetingLinkList réutilisable
 * Liste de liens de réunion avec filtres et gestion d'état
 */

import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { MeetingLinkCard } from '@/components/ui/MeetingLinkCard';
import { FilterBar } from '@/components/ui/FilterBar';
import { EmptyState } from '@/components/ui/EmptyState';
import { useMeetingLinkFilters } from '@/hooks/useMeetingLinkFilters';
import type { MeetingLink, DayFilter, PlatformFilter } from '@/types';
import { MeetingLinkService } from '@/services/meetingLinkService';

// Configuration des filtres
const DAYS_FILTERS: DayFilter[] = [
  { id: 'lundi', label: 'Lun' },
  { id: 'mardi', label: 'Mar' },
  { id: 'mercredi', label: 'Mer' },
  { id: 'jeudi', label: 'Jeu' },
  { id: 'vendredi', label: 'Ven' },
  { id: 'samedi', label: 'Sam' },
  { id: 'dimanche', label: 'Dim' },
];

const PLATFORM_FILTERS: PlatformFilter[] = [
  { id: 'zoom', label: 'Zoom', icon: '📹' },
  { id: 'google-meet', label: 'Google Meet', icon: '🎥' },
  { id: 'teams', label: 'Teams', icon: '💼' },
  { id: 'webex', label: 'Webex', icon: '🌐' },
  { id: 'other', label: 'Autre', icon: '🔗' },
];

interface MeetingLinkListProps {
  meetingLinks: MeetingLink[];
  onUnlockRequest?: (meetingLinkId: string) => void;
  unlockedMeetingLinks?: string[];
  emptyStateTitle?: string;
  emptyStateMessage?: string;
  emptyStateIcon?: React.ReactNode;
  showFilters?: boolean;
  defaultToToday?: boolean;
}

export const MeetingLinkList: React.FC<MeetingLinkListProps> = ({
  meetingLinks,
  onUnlockRequest,
  unlockedMeetingLinks = [],
  emptyStateTitle = 'Aucun lien de réunion disponible',
  emptyStateMessage = 'Aucun lien de réunion ne correspond à vos critères de recherche',
  emptyStateIcon,
  showFilters = true,
  defaultToToday = false,
}) => {
  const [expandedMeetingLink, setExpandedMeetingLink] = useState<string | null>(null);
  
  const {
    selectedDay,
    selectedPlatform,
    setSelectedDay,
    setSelectedPlatform,
    filteredMeetingLinks,
  } = useMeetingLinkFilters(meetingLinks, defaultToToday);

  const handleMeetingLinkPress = (meetingLinkId: string) => {
    setExpandedMeetingLink(expandedMeetingLink === meetingLinkId ? null : meetingLinkId);
  };

  const handleJoinMeetingLink = (meetingLink: MeetingLink) => {
    MeetingLinkService.joinMeetingLink(meetingLink);
  };

  const renderMeetingLink = ({ item }: { item: MeetingLink }) => (
    <MeetingLinkCard
      meetingLink={item}
      isExpanded={expandedMeetingLink === item.id}
      onPress={() => handleMeetingLinkPress(item.id)}
      onJoinMeetingLink={handleJoinMeetingLink}
      isUnlocked={unlockedMeetingLinks.includes(item.id)}
      onUnlockRequest={onUnlockRequest}
    />
  );

  return (
    <View style={styles.container}>
      {/* Filtres */}
      {showFilters && (
        <View style={styles.filtersContainer}>
          <FilterBar
            filters={PLATFORM_FILTERS}
            selectedFilter={selectedPlatform}
            onFilterSelect={setSelectedPlatform}
            allLabel="Toutes plateformes"
            showIcons={true}
          />
          
          <FilterBar
            filters={DAYS_FILTERS}
            selectedFilter={selectedDay}
            onFilterSelect={setSelectedDay}
            allLabel="Tous les jours"
          />
        </View>
      )}

      {/* Liste des liens de réunion */}
      {filteredMeetingLinks.length > 0 ? (
        <FlatList
          data={filteredMeetingLinks}
          renderItem={renderMeetingLink}
          keyExtractor={(item) => item.id}
          style={styles.meetingLinksList}
          contentContainerStyle={styles.meetingLinksContent}
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
  meetingLinksList: {
    flex: 1,
  },
  meetingLinksContent: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
});