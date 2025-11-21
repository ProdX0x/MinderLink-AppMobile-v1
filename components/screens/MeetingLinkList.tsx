/**
 * Composant MeetingLinkList réutilisable
 * Liste de liens de réunion avec filtres et gestion d'état
 */

import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { MeetingLinkCard } from '@/components/ui/MeetingLinkCard';
import { FilterBar } from '@/components/ui/FilterBar';
import { EmptyState } from '@/components/ui/EmptyState';
import { EditMeetingModal } from '@/components/ui/EditMeetingModal';
import { useMeetingLinkFilters } from '@/hooks/useMeetingLinkFilters';
import type { MeetingLink, DayFilter, PlatformFilter, UpdateMeetingInput } from '@/types';
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
  onEditMeeting?: (data: UpdateMeetingInput) => Promise<void>;
  enableEditing?: boolean;
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
  onEditMeeting,
  enableEditing = false,
}) => {
  const [expandedMeetingLink, setExpandedMeetingLink] = useState<string | null>(null);
  const [editingMeeting, setEditingMeeting] = useState<MeetingLink | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  
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

  const handleEditMeeting = (meetingLink: MeetingLink) => {
    setEditingMeeting(meetingLink);
    setShowEditModal(true);
  };

  const handleSaveEdit = async (data: UpdateMeetingInput) => {
    if (onEditMeeting) {
      await onEditMeeting(data);
      setShowEditModal(false);
      setEditingMeeting(null);
    }
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setEditingMeeting(null);
  };

  const renderMeetingLink = ({ item }: { item: MeetingLink }) => (
    <MeetingLinkCard
      meetingLink={item}
      isExpanded={expandedMeetingLink === item.id}
      onPress={() => handleMeetingLinkPress(item.id)}
      onJoinMeeting={handleJoinMeetingLink}
      isUnlocked={unlockedMeetingLinks.includes(item.id)}
      onUnlockRequest={onUnlockRequest}
      onEdit={enableEditing ? handleEditMeeting : undefined}
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

      {/* Modal d'édition */}
      <EditMeetingModal
        visible={showEditModal}
        onClose={handleCloseModal}
        onSave={handleSaveEdit}
        meeting={editingMeeting || undefined}
        type="meeting"
      />
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