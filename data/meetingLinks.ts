/**
 * Données des liens de réunion
 * Centralise toutes les données de liens avec typage strict
 */

import type { MeetingLink } from '@/types';

/**
 * Liens de réunion avec informations complètes
 */
export const meetingLinks: MeetingLink[] = [
  // Réunions d'aujourd'hui
  {
    id: '1',
    title: 'Réunion équipe développement',
    platform: 'zoom',
    link: 'https://zoom.us/j/4188579113',
    password: 'dev2024',
    notes: 'Point hebdomadaire sur l\'avancement des projets',
    category: 'public',
    date: new Date().toISOString().split('T')[0], // Aujourd'hui
    time: '09:00',
    duration: 60,
    organizer: 'Marie Dubois',
    maxParticipants: 50,
    tags: ['développement', 'hebdomadaire'],
    isRecurring: true,
    recurrencePattern: 'Chaque lundi 9h00'
  },
  {
    id: '2',
    title: 'Formation MinderLink',
    platform: 'google-meet',
    link: 'https://meet.google.com/abc-defg-hij',
    notes: 'Session de formation sur l\'utilisation de MinderLink',
    category: 'public',
    date: new Date().toISOString().split('T')[0], // Aujourd'hui
    time: '14:30',
    duration: 90,
    organizer: 'Jean Martin',
    maxParticipants: 100,
    tags: ['formation', 'minderlink'],
    isRecurring: false
  },
  {
    id: '3',
    title: 'Réunion direction - Confidentiel',
    platform: 'teams',
    link: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting',
    password: 'dir2024',
    notes: 'Réunion stratégique - Accès restreint',
    category: 'private',
    date: new Date().toISOString().split('T')[0], // Aujourd'hui
    time: '16:00',
    duration: 120,
    organizer: 'Directeur Général',
    maxParticipants: 10,
    tags: ['direction', 'stratégie', 'confidentiel'],
    isRecurring: false
  },
  
  // Réunions de demain
  {
    id: '4',
    title: 'Stand-up quotidien',
    platform: 'zoom',
    link: 'https://zoom.us/j/1234567890',
    password: 'standup',
    notes: 'Point quotidien de l\'équipe Scrum',
    category: 'public',
    date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Demain
    time: '09:15',
    duration: 15,
    organizer: 'Scrum Master',
    maxParticipants: 20,
    tags: ['scrum', 'quotidien'],
    isRecurring: true,
    recurrencePattern: 'Tous les jours ouvrés 9h15'
  },
  {
    id: '5',
    title: 'Présentation client - Projet Alpha',
    platform: 'webex',
    link: 'https://company.webex.com/meet/presentation',
    password: 'alpha2024',
    notes: 'Présentation finale du projet Alpha au client',
    category: 'private',
    date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Demain
    time: '15:00',
    duration: 180,
    organizer: 'Chef de projet',
    maxParticipants: 25,
    tags: ['client', 'présentation', 'alpha'],
    isRecurring: false
  },
  
  // Réunions de cette semaine
  {
    id: '6',
    title: 'Rétrospective Sprint',
    platform: 'zoom',
    link: 'https://zoom.us/j/9876543210',
    password: 'retro',
    notes: 'Rétrospective de fin de sprint avec l\'équipe',
    category: 'public',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Après-demain
    time: '14:00',
    duration: 90,
    organizer: 'Product Owner',
    maxParticipants: 15,
    tags: ['scrum', 'rétrospective'],
    isRecurring: true,
    recurrencePattern: 'Fin de chaque sprint'
  },
  {
    id: '7',
    title: 'Comité de pilotage',
    platform: 'teams',
    link: 'https://teams.microsoft.com/l/meetup-join/19%3acomite',
    password: 'pilotage2024',
    notes: 'Comité de pilotage mensuel - Accès sur invitation',
    category: 'private',
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    time: '10:00',
    duration: 150,
    organizer: 'Directeur de projet',
    maxParticipants: 12,
    tags: ['pilotage', 'mensuel', 'direction'],
    isRecurring: true,
    recurrencePattern: 'Premier jeudi de chaque mois'
  },
  {
    id: '8',
    title: 'Formation sécurité informatique',
    platform: 'google-meet',
    link: 'https://meet.google.com/security-training',
    notes: 'Formation obligatoire sur la sécurité informatique',
    category: 'public',
    date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    time: '13:30',
    duration: 120,
    organizer: 'Responsable sécurité',
    maxParticipants: 200,
    tags: ['formation', 'sécurité', 'obligatoire'],
    isRecurring: false
  },
  {
    id: '9',
    title: 'Réunion RH - Entretiens annuels',
    platform: 'other',
    link: 'https://custom-platform.company.com/hr-meeting',
    password: 'hr2024',
    notes: 'Préparation des entretiens annuels - RH uniquement',
    category: 'private',
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    time: '11:00',
    duration: 60,
    organizer: 'DRH',
    maxParticipants: 8,
    tags: ['rh', 'entretiens', 'confidentiel'],
    isRecurring: false
  },
  {
    id: '10',
    title: 'Démonstration produit',
    platform: 'zoom',
    link: 'https://zoom.us/j/demo123456',
    password: 'demo2024',
    notes: 'Démonstration du nouveau produit aux équipes commerciales',
    category: 'public',
    date: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    time: '16:30',
    duration: 45,
    organizer: 'Responsable produit',
    maxParticipants: 75,
    tags: ['démonstration', 'produit', 'commercial'],
    isRecurring: false
  }
];

/**
 * Fonction utilitaire pour obtenir les réunions d'aujourd'hui
 */
export const getTodayMeetingLinks = (): MeetingLink[] => {
  const today = new Date().toISOString().split('T')[0];
  return meetingLinks.filter(link => link.date === today);
};

/**
 * Fonction utilitaire pour obtenir les réunions par catégorie
 */
export const getMeetingLinksByCategory = (category: 'public' | 'private'): MeetingLink[] => {
  return meetingLinks.filter(link => link.category === category);
};

/**
 * Fonction utilitaire pour obtenir les réunions par plateforme
 */
export const getMeetingLinksByPlatform = (platform: string): MeetingLink[] => {
  return meetingLinks.filter(link => link.platform === platform);
};