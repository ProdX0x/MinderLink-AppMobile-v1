/**
 * Utilitaires pour la gestion des liens de réunion
 * Fonctions pures pour le traitement des données de liens de réunion
 */

import type { MeetingLink, DayFilter, PlatformFilter } from '@/types';

/**
 * Filtre les liens de réunion selon les critères sélectionnés
 */
export const filterMeetingLinks = (
  meetingLinks: MeetingLink[],
  selectedDay: string | null,
  selectedPlatform: string | null
): MeetingLink[] => {
  return meetingLinks.filter(link => {
    const linkDate = new Date(link.date);
    const dayOfWeek = linkDate.toLocaleDateString('fr-FR', { weekday: 'long' });
    
    const matchesDay = selectedDay ? dayOfWeek === selectedDay : true;
    const matchesPlatform = selectedPlatform ? link.platform === selectedPlatform : true;
    
    return matchesDay && matchesPlatform;
  });
};

/**
 * Obtient le jour actuel au format attendu par les filtres
 */
export const getTodayAsDayFilter = (): string => {
  return new Date().toLocaleDateString('fr-FR', { weekday: 'long' });
};

/**
 * Filtre les liens de réunion pour aujourd'hui
 */
export const getTodayMeetingLinks = (meetingLinks: MeetingLink[]): MeetingLink[] => {
  const today = new Date().toISOString().split('T')[0];
  return meetingLinks.filter(link => link.date === today);
};

/**
 * Formate une date pour l'affichage
 */
export const formatMeetingLinkDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

/**
 * Vérifie si un lien de réunion est privé
 */
export const isPrivateLink = (meetingLink: MeetingLink): boolean => {
  return meetingLink.category === 'private';
};

/**
 * Vérifie si un lien de réunion est public
 */
export const isPublicLink = (meetingLink: MeetingLink): boolean => {
  return meetingLink.category === 'public';
};

/**
 * Extrait les informations de connexion d'un lien de réunion
 */
export const getMeetingConnectionInfo = (meetingLink: MeetingLink) => {
  return {
    platform: meetingLink.platform,
    link: meetingLink.link,
    password: meetingLink.password,
    meetingId: extractMeetingId(meetingLink.link, meetingLink.platform),
  };
};

/**
 * Extrait l'ID de réunion depuis le lien selon la plateforme
 */
const extractMeetingId = (link: string, platform: string): string | undefined => {
  switch (platform) {
    case 'zoom':
      const zoomMatch = link.match(/\/j\/(\d+)/);
      return zoomMatch ? zoomMatch[1] : undefined;
    case 'google-meet':
      const meetMatch = link.match(/\/([a-z-]+)$/);
      return meetMatch ? meetMatch[1] : undefined;
    case 'teams':
      // Teams utilise des IDs complexes, on retourne une partie du lien
      return 'teams-meeting';
    default:
      return undefined;
  }
};

/**
 * Génère un ID unique pour un lien de réunion
 */
export const generateMeetingLinkId = (): string => {
  return `meeting_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Valide les données d'un lien de réunion
 */
export const validateMeetingLink = (meetingLink: Partial<MeetingLink>): boolean => {
  const requiredFields = ['id', 'title', 'platform', 'link', 'category', 'date', 'time', 'duration', 'organizer'];
  
  return requiredFields.every(field => {
    const value = meetingLink[field as keyof MeetingLink];
    return value !== undefined && value !== null && value !== '';
  });
};

/**
 * Trie les liens de réunion par date et heure
 */
export const sortMeetingLinksByDateTime = (meetingLinks: MeetingLink[]): MeetingLink[] => {
  return [...meetingLinks].sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.time}`);
    const dateB = new Date(`${b.date} ${b.time}`);
    return dateA.getTime() - dateB.getTime();
  });
};

/**
 * Groupe les liens de réunion par jour
 */
export const groupMeetingLinksByDay = (meetingLinks: MeetingLink[]): Record<string, MeetingLink[]> => {
  return meetingLinks.reduce((groups, link) => {
    const date = link.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(link);
    return groups;
  }, {} as Record<string, MeetingLink[]>);
};

/**
 * Groupe les liens de réunion par plateforme
 */
export const groupMeetingLinksByPlatform = (meetingLinks: MeetingLink[]): Record<string, MeetingLink[]> => {
  return meetingLinks.reduce((groups, link) => {
    const platform = link.platform;
    if (!groups[platform]) {
      groups[platform] = [];
    }
    groups[platform].push(link);
    return groups;
  }, {} as Record<string, MeetingLink[]>);
};

/**
 * Obtient le nom d'affichage d'une plateforme
 */
export const getPlatformDisplayName = (platform: string): string => {
  const platformNames: Record<string, string> = {
    'zoom': 'Zoom',
    'google-meet': 'Google Meet',
    'teams': 'Microsoft Teams',
    'webex': 'Cisco Webex',
    'other': 'Autre plateforme'
  };
  
  return platformNames[platform] || platform;
};

/**
 * Obtient l'icône d'une plateforme
 */
export const getPlatformIcon = (platform: string): string => {
  const platformIcons: Record<string, string> = {
    'zoom': '📹',
    'google-meet': '🎥',
    'teams': '💼',
    'webex': '🌐',
    'other': '🔗'
  };
  
  return platformIcons[platform] || '🔗';
};