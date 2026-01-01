/**
 * Hook personnalisé pour la gestion des filtres de sessions
 * Centralise la logique de filtrage et l'état des filtres
 */

import { useState, useMemo } from 'react';
import type { Session, UseSessionFiltersReturn } from '@/types';
import { filterSessions } from '@/utils/session';

/**
 * Hook pour gérer les filtres de sessions
 */
export const useSessionFilters = (sessions: Session[]): UseSessionFiltersReturn => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  // Calcul des sessions filtrées avec mémoïsation
  const filteredSessions = useMemo(() => {
    return filterSessions(sessions, selectedDay, selectedLanguage);
  }, [sessions, selectedDay, selectedLanguage]);

  return {
    selectedDay,
    selectedLanguage,
    setSelectedDay,
    setSelectedLanguage,
    filteredSessions,
  };
};