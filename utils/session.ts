/**
 * Utilitaires pour la gestion des sessions
 * Fonctions pures pour le traitement des données de session
 */

import type { Session, PublicSession, VipSession, DayFilter, LanguageFilter } from '@/types';

/**
 * Filtre les sessions selon les critères sélectionnés
 */
export const filterSessions = (
  sessions: Session[],
  selectedDay: string | null,
  selectedLanguage: string | null
): Session[] => {
  return sessions.filter(session => {
    const matchesDay = selectedDay ? 
      (Array.isArray(session.day) ? session.day.includes(selectedDay) : session.day === selectedDay) : true;
    const matchesLanguage = selectedLanguage ? 
      (Array.isArray(session.language) ? session.language.includes(selectedLanguage) : session.language === selectedLanguage) : true;
    
    return matchesDay && matchesLanguage;
  });
};

/**
 * Formate une date pour l'affichage
 */
export const formatSessionDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

/**
 * Vérifie si une session est de type VIP
 */
export const isVipSession = (session: Session): session is VipSession => {
  return session.type === 'vip';
};

/**
 * Vérifie si une session est de type public
 */
export const isPublicSession = (session: Session): session is PublicSession => {
  return session.type === 'public';
};

/**
 * Extrait les informations de connexion Zoom d'une session
 */
export const getZoomConnectionInfo = (session: Session) => {
  const baseInfo = {
    zoomId: session.zoomId,
  };

  if (isPublicSession(session)) {
    return {
      ...baseInfo,
      zoomLink: session.zoomLink,
      phoneNumbers: session.phoneNumbers,
    };
  }

  if (isVipSession(session)) {
    return {
      ...baseInfo,
      password: session.password,
    };
  }

  return baseInfo;
};

/**
 * Génère un ID unique pour une session
 */
export const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Valide les données d'une session
 */
export const validateSession = (session: Partial<Session>): boolean => {
  const requiredFields = ['id', 'region', 'date', 'time', 'duration', 'zoomId', 'language', 'type', 'day', 'instructor', 'maxParticipants'];
  
  return requiredFields.every(field => {
    const value = session[field as keyof Session];
    return value !== undefined && value !== null && value !== '';
  });
};

/**
 * Trie les sessions par date et heure
 */
export const sortSessionsByDateTime = (sessions: Session[]): Session[] => {
  return [...sessions].sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.time}`);
    const dateB = new Date(`${b.date} ${b.time}`);
    return dateA.getTime() - dateB.getTime();
  });
};

/**
 * Groupe les sessions par jour
 */
export const groupSessionsByDay = (sessions: Session[]): Record<string, Session[]> => {
  return sessions.reduce((groups, session) => {
    const day = session.day;
    if (!groups[day]) {
      groups[day] = [];
    }
    groups[day].push(session);
    return groups;
  }, {} as Record<string, Session[]>);
};