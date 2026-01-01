/**
 * Utilitaires pour les sessions de méditation
 * Fonctions de formatage et helpers pour les sessions
 */

import type { Session, PublicSession, VipSession } from '@/types';

/**
 * Vérifie si une session est VIP
 */
export function isVipSession(session: Session): session is VipSession {
  return session.type === 'vip';
}

/**
 * Vérifie si une session est publique
 */
export function isPublicSession(session: Session): session is PublicSession {
  return session.type === 'public';
}

/**
 * Formate la date d'une session
 */
export function formatSessionDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('fr-FR', options);
  } catch (error) {
    return dateString;
  }
}

/**
 * Obtient le nom du jour en français
 */
export function getDayName(dateString: string): string {
  try {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
    return date.toLocaleDateString('fr-FR', options);
  } catch (error) {
    return '';
  }
}

/**
 * Formate le fuseau horaire
 */
export function formatTimeZone(timeZone?: string): string {
  if (!timeZone) return '';
  return ` (${timeZone})`;
}

/**
 * Obtient la couleur pour le type de session
 */
export function getSessionColor(session: Session): string {
  return isVipSession(session) ? '#F4A460' : '#48BB78';
}

/**
 * Obtient le libellé du type de session
 */
export function getSessionTypeLabel(session: Session): string {
  return isVipSession(session) ? 'VIP' : 'PUBLIC';
}

/**
 * Formate les jours de la semaine (pour sessions récurrentes)
 */
export function formatDays(day: string | string[]): string {
  if (Array.isArray(day)) {
    return day.join(', ');
  }
  return day;
}

/**
 * Vérifie si une session est en cours
 */
export function isSessionActive(session: Session): boolean {
  const now = new Date();
  const sessionStart = new Date(`${session.date} ${session.time}`);
  const sessionEnd = new Date(sessionStart.getTime() + session.duration * 60000);

  return now >= sessionStart && now <= sessionEnd;
}

/**
 * Calcule le temps restant avant une session
 */
export function getTimeUntilSession(session: Session): number {
  const now = new Date();
  const sessionStart = new Date(`${session.date} ${session.time}`);

  return sessionStart.getTime() - now.getTime();
}

/**
 * Formate le temps restant en texte lisible
 */
export function formatTimeUntilSession(milliseconds: number): string {
  if (milliseconds <= 0) {
    return 'En cours';
  }

  const minutes = Math.floor(milliseconds / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `Dans ${days} jour${days > 1 ? 's' : ''}`;
  }

  if (hours > 0) {
    return `Dans ${hours}h ${minutes % 60}min`;
  }

  return `Dans ${minutes} minute${minutes > 1 ? 's' : ''}`;
}
