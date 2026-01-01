/**
 * Hook pour gérer les réunions avec Supabase
 * Fournit les opérations CRUD et la gestion d'état
 */

import { useState, useEffect, useCallback } from 'react';
import { SupabaseMeetingService } from '@/services/supabaseMeetingService';
import type {
  DatabaseMeeting,
  MeetingLink,
  Session,
  CreateMeetingInput,
  UpdateMeetingInput,
} from '@/types';

interface UseMeetingsOptions {
  type?: 'meeting' | 'public_session' | 'vip_session';
  category?: 'public' | 'private';
  autoFetch?: boolean;
}

interface UseMeetingsReturn {
  meetings: DatabaseMeeting[];
  meetingLinks: MeetingLink[];
  sessions: Session[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  createMeeting: (input: CreateMeetingInput) => Promise<DatabaseMeeting>;
  updateMeeting: (input: UpdateMeetingInput) => Promise<DatabaseMeeting>;
  deleteMeeting: (id: string) => Promise<void>;
}

export function useMeetings(options: UseMeetingsOptions = {}): UseMeetingsReturn {
  const { type, category, autoFetch = true } = options;

  const [meetings, setMeetings] = useState<DatabaseMeeting[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchMeetings = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      let data: DatabaseMeeting[];

      if (type) {
        data = await SupabaseMeetingService.getMeetingsByType(type);
      } else if (category) {
        data = await SupabaseMeetingService.getMeetingsByCategory(category);
      } else {
        data = await SupabaseMeetingService.getAllMeetings();
      }

      setMeetings(data);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Erreur inconnue');
      setError(error);
      console.error('Erreur lors de la récupération des réunions:', error);
    } finally {
      setIsLoading(false);
    }
  }, [type, category]);

  useEffect(() => {
    if (autoFetch) {
      fetchMeetings();
    }
  }, [autoFetch, fetchMeetings]);

  const createMeeting = useCallback(
    async (input: CreateMeetingInput): Promise<DatabaseMeeting> => {
      try {
        setError(null);
        const newMeeting = await SupabaseMeetingService.createMeeting(input);

        // Mise à jour optimiste
        setMeetings((prev) => [...prev, newMeeting]);

        return newMeeting;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Erreur lors de la création');
        setError(error);
        throw error;
      }
    },
    []
  );

  const updateMeeting = useCallback(
    async (input: UpdateMeetingInput): Promise<DatabaseMeeting> => {
      try {
        setError(null);
        const updatedMeeting = await SupabaseMeetingService.updateMeeting(input);

        // Mise à jour optimiste
        setMeetings((prev) =>
          prev.map((m) => (m.id === updatedMeeting.id ? updatedMeeting : m))
        );

        return updatedMeeting;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Erreur lors de la mise à jour');
        setError(error);
        throw error;
      }
    },
    []
  );

  const deleteMeeting = useCallback(async (id: string): Promise<void> => {
    try {
      setError(null);
      await SupabaseMeetingService.deleteMeeting(id);

      // Mise à jour optimiste
      setMeetings((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Erreur lors de la suppression');
      setError(error);
      throw error;
    }
  }, []);

  // Convertir les meetings en MeetingLinks
  const meetingLinks = meetings
    .filter((m) => m.type === 'meeting')
    .map((m) => SupabaseMeetingService.toMeetingLink(m));

  // Convertir les meetings en Sessions
  const sessions = meetings
    .filter((m) => m.type === 'public_session' || m.type === 'vip_session')
    .map((m) => SupabaseMeetingService.toSession(m));

  return {
    meetings,
    meetingLinks,
    sessions,
    isLoading,
    error,
    refetch: fetchMeetings,
    createMeeting,
    updateMeeting,
    deleteMeeting,
  };
}

/**
 * Hook spécialisé pour les réunions du jour
 */
export function useTodayMeetings() {
  const [meetings, setMeetings] = useState<DatabaseMeeting[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchTodayMeetings = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await SupabaseMeetingService.getTodayMeetings();
      setMeetings(data);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Erreur inconnue');
      setError(error);
      console.error('Erreur lors de la récupération des réunions du jour:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodayMeetings();
  }, [fetchTodayMeetings]);

  const meetingLinks = meetings
    .filter((m) => m.type === 'meeting')
    .map((m) => SupabaseMeetingService.toMeetingLink(m));

  return {
    meetings,
    meetingLinks,
    isLoading,
    error,
    refetch: fetchTodayMeetings,
  };
}
