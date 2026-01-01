/**
 * Hook personnalisé pour la gestion des filtres de liens de réunion
 * Centralise la logique de filtrage et l'état des filtres
 */

import { useState, useMemo } from 'react';
import type { MeetingLink, UseMeetingLinkFiltersReturn } from '@/types';
import { filterMeetingLinks, getTodayAsDayFilter } from '@/utils/meetingLink';

/**
 * Hook pour gérer les filtres de liens de réunion
 */
export const useMeetingLinkFilters = (
  meetingLinks: MeetingLink[],
  defaultToToday: boolean = false
): UseMeetingLinkFiltersReturn => {
  const [selectedDay, setSelectedDay] = useState<string | null>(
    defaultToToday ? getTodayAsDayFilter() : null
  );
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

  // Calcul des liens filtrés avec mémoïsation
  const filteredMeetingLinks = useMemo(() => {
    return filterMeetingLinks(meetingLinks, selectedDay, selectedPlatform);
  }, [meetingLinks, selectedDay, selectedPlatform]);

  return {
    selectedDay,
    selectedPlatform,
    setSelectedDay,
    setSelectedPlatform,
    filteredMeetingLinks,
  };
};