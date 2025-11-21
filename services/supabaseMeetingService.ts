/**
 * Service Supabase pour la gestion des réunions
 * Fournit toutes les opérations CRUD sur la table meetings
 */

import { supabase } from '@/lib/supabase';
import type {
  DatabaseMeeting,
  CreateMeetingInput,
  UpdateMeetingInput,
  MeetingLink,
  Session,
  PublicSession,
  VipSession,
} from '@/types';

export class SupabaseMeetingService {
  /**
   * Récupère toutes les réunions
   */
  static async getAllMeetings(): Promise<DatabaseMeeting[]> {
    const { data, error } = await supabase
      .from('meetings')
      .select('*')
      .order('date', { ascending: true })
      .order('time', { ascending: true });

    if (error) {
      console.error('Erreur lors de la récupération des réunions:', error);
      throw new Error(`Impossible de récupérer les réunions: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Récupère une réunion par son ID
   */
  static async getMeetingById(id: string): Promise<DatabaseMeeting | null> {
    const { data, error } = await supabase
      .from('meetings')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('Erreur lors de la récupération de la réunion:', error);
      throw new Error(`Impossible de récupérer la réunion: ${error.message}`);
    }

    return data;
  }

  /**
   * Récupère les réunions par type
   */
  static async getMeetingsByType(
    type: 'meeting' | 'public_session' | 'vip_session'
  ): Promise<DatabaseMeeting[]> {
    const { data, error } = await supabase
      .from('meetings')
      .select('*')
      .eq('type', type)
      .order('date', { ascending: true })
      .order('time', { ascending: true });

    if (error) {
      console.error('Erreur lors de la récupération des réunions par type:', error);
      throw new Error(`Impossible de récupérer les réunions: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Récupère les réunions par catégorie
   */
  static async getMeetingsByCategory(category: 'public' | 'private'): Promise<DatabaseMeeting[]> {
    const { data, error } = await supabase
      .from('meetings')
      .select('*')
      .eq('category', category)
      .order('date', { ascending: true })
      .order('time', { ascending: true });

    if (error) {
      console.error('Erreur lors de la récupération des réunions par catégorie:', error);
      throw new Error(`Impossible de récupérer les réunions: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Récupère les réunions d'aujourd'hui
   */
  static async getTodayMeetings(): Promise<DatabaseMeeting[]> {
    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('meetings')
      .select('*')
      .eq('date', today)
      .order('time', { ascending: true });

    if (error) {
      console.error('Erreur lors de la récupération des réunions du jour:', error);
      throw new Error(`Impossible de récupérer les réunions: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Récupère les réunions par plateforme
   */
  static async getMeetingsByPlatform(platform: string): Promise<DatabaseMeeting[]> {
    const { data, error } = await supabase
      .from('meetings')
      .select('*')
      .eq('platform', platform)
      .order('date', { ascending: true })
      .order('time', { ascending: true});

    if (error) {
      console.error('Erreur lors de la récupération des réunions par plateforme:', error);
      throw new Error(`Impossible de récupérer les réunions: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Crée une nouvelle réunion
   */
  static async createMeeting(input: CreateMeetingInput): Promise<DatabaseMeeting> {
    const { data, error } = await supabase
      .from('meetings')
      .insert([input])
      .select()
      .single();

    if (error) {
      console.error('Erreur lors de la création de la réunion:', error);
      throw new Error(`Impossible de créer la réunion: ${error.message}`);
    }

    return data;
  }

  /**
   * Met à jour une réunion existante
   */
  static async updateMeeting(input: UpdateMeetingInput): Promise<DatabaseMeeting> {
    const { id, ...updateData } = input;

    const { data, error } = await supabase
      .from('meetings')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Erreur lors de la mise à jour de la réunion:', error);
      throw new Error(`Impossible de mettre à jour la réunion: ${error.message}`);
    }

    return data;
  }

  /**
   * Supprime une réunion
   */
  static async deleteMeeting(id: string): Promise<void> {
    const { error } = await supabase.from('meetings').delete().eq('id', id);

    if (error) {
      console.error('Erreur lors de la suppression de la réunion:', error);
      throw new Error(`Impossible de supprimer la réunion: ${error.message}`);
    }
  }

  /**
   * Convertit une DatabaseMeeting en MeetingLink
   */
  static toMeetingLink(dbMeeting: DatabaseMeeting): MeetingLink {
    return {
      id: dbMeeting.id,
      title: dbMeeting.title,
      platform: (dbMeeting.platform as any) || 'zoom',
      link: dbMeeting.link,
      password: dbMeeting.password || undefined,
      notes: dbMeeting.notes || undefined,
      category: dbMeeting.category,
      date: dbMeeting.date,
      time: dbMeeting.time,
      duration: dbMeeting.duration,
      organizer: dbMeeting.organizer,
      maxParticipants: dbMeeting.max_participants || undefined,
      tags: dbMeeting.tags || undefined,
      isRecurring: dbMeeting.is_recurring || undefined,
      recurrencePattern: dbMeeting.recurrence_pattern || undefined,
    };
  }

  /**
   * Convertit une DatabaseMeeting en Session (PublicSession ou VipSession)
   */
  static toSession(dbMeeting: DatabaseMeeting): Session {
    const baseSession = {
      id: dbMeeting.id,
      region: dbMeeting.region || dbMeeting.title,
      date: dbMeeting.date,
      time: dbMeeting.time,
      duration: dbMeeting.duration,
      zoomId: dbMeeting.zoom_id || '',
      language: dbMeeting.language || 'fr',
      day: dbMeeting.day || '',
      instructor: dbMeeting.instructor || dbMeeting.organizer,
      maxParticipants: dbMeeting.max_participants || 100,
    };

    if (dbMeeting.type === 'public_session') {
      return {
        ...baseSession,
        type: 'public' as const,
        zoomLink: dbMeeting.link,
        phoneNumbers: dbMeeting.phone_numbers || [],
        schedule: dbMeeting.schedule || '',
        languages: dbMeeting.languages || [],
        timeZone: dbMeeting.time_zone || '',
        description: dbMeeting.description || { en: '', fr: '' },
      } as PublicSession;
    } else {
      return {
        ...baseSession,
        type: 'vip' as const,
        password: dbMeeting.password || '',
      } as VipSession;
    }
  }

  /**
   * Convertit un MeetingLink en CreateMeetingInput
   */
  static fromMeetingLink(meetingLink: MeetingLink): CreateMeetingInput {
    return {
      title: meetingLink.title,
      type: 'meeting',
      category: meetingLink.category,
      platform: meetingLink.platform,
      link: meetingLink.link,
      password: meetingLink.password,
      date: meetingLink.date,
      time: meetingLink.time,
      duration: meetingLink.duration,
      organizer: meetingLink.organizer,
      max_participants: meetingLink.maxParticipants,
      notes: meetingLink.notes,
      tags: meetingLink.tags,
      is_recurring: meetingLink.isRecurring,
      recurrence_pattern: meetingLink.recurrencePattern,
    };
  }

  /**
   * Convertit une Session en CreateMeetingInput
   */
  static fromSession(session: Session): CreateMeetingInput {
    const base: CreateMeetingInput = {
      title: session.region,
      region: session.region,
      type: session.type === 'public' ? 'public_session' : 'vip_session',
      category: session.type === 'public' ? 'public' : 'private',
      platform: 'zoom',
      link: session.type === 'public' ? (session as PublicSession).zoomLink : '',
      zoom_id: session.zoomId,
      date: session.date,
      time: session.time,
      duration: session.duration,
      organizer: session.instructor,
      instructor: session.instructor,
      max_participants: session.maxParticipants,
      language: Array.isArray(session.language) ? session.language[0] : session.language,
      day: session.day,
    };

    if (session.type === 'public') {
      const publicSession = session as PublicSession;
      return {
        ...base,
        languages: publicSession.languages,
        phone_numbers: publicSession.phoneNumbers,
        schedule: publicSession.schedule,
        time_zone: publicSession.timeZone,
        description: publicSession.description,
      };
    } else {
      const vipSession = session as VipSession;
      return {
        ...base,
        password: vipSession.password,
      };
    }
  }
}
