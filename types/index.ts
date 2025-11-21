/**
 * Types globaux de l'application MinderLink
 * Centralise toutes les définitions de types pour assurer la cohérence
 */

// Types de base pour les liens de réunion
export interface MeetingLink {
  id: string;
  title: string;
  platform: 'zoom' | 'google-meet' | 'teams' | 'webex' | 'other';
  link: string;
  password?: string;
  notes?: string;
  category: 'public' | 'private';
  date: string;
  time: string;
  duration: number;
  organizer: string;
  maxParticipants?: number;
  tags?: string[];
  isRecurring?: boolean;
  recurrencePattern?: string;
}

// Types pour les filtres
export interface DayFilter {
  id: string;
  label: string;
}

export interface PlatformFilter {
  id: string;
  label: string;
  icon: string;
}

// Types pour les props des composants
export interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
  icon?: string;
}

export interface MeetingLinkCardProps {
  meetingLink: MeetingLink;
  isExpanded: boolean;
  onPress: () => void;
  onJoinMeeting?: (meetingLink: MeetingLink) => void;
  isUnlocked?: boolean;
  onUnlockRequest?: (meetingLinkId: string) => void;
  onEdit?: (meetingLink: MeetingLink) => void;
}

export interface HeaderProps {
  title: string;
  onBackPress: () => void;
  rightComponent?: React.ReactNode;
}

// Types pour les hooks
export interface UseMeetingLinkFiltersReturn {
  selectedDay: string | null;
  selectedPlatform: string | null;
  setSelectedDay: (day: string | null) => void;
  setSelectedPlatform: (platform: string | null) => void;
  filteredMeetingLinks: MeetingLink[];
}

export interface UsePrivateLinkAuthReturn {
  isAuthenticated: boolean;
  authenticate: (password: string) => Promise<boolean>;
  logout: () => void;
}

// Types pour les services
export interface MeetingConnectionInfo {
  platform: string;
  link: string;
  password?: string;
  meetingId?: string;
  phoneNumbers?: string[];
}

// Types pour l'accessibilité
export interface AccessibilityProps {
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: string;
  accessibilityState?: {
    selected?: boolean;
    expanded?: boolean;
    disabled?: boolean;
  };
}

// Types pour les styles responsifs
export interface ResponsiveStyleProps {
  isSmallScreen: boolean;
  isMediumScreen: boolean;
  isLargeScreen: boolean;
  screenWidth: number;
  screenHeight: number;
}

// Types pour les sessions de méditation
export interface BaseSession {
  id: string;
  region: string;
  date: string;
  time: string;
  duration: number;
  zoomId: string;
  language: string | string[];
  type: 'public' | 'vip';
  day: string | string[];
  instructor: string;
  maxParticipants: number;
}

export interface PublicSession extends BaseSession {
  type: 'public';
  zoomLink: string;
  phoneNumbers: string[];
  schedule: string;
  languages: string[];
  timeZone: string;
  description: {
    en: string;
    fr: string;
  };
}

export interface VipSession extends BaseSession {
  type: 'vip';
  password: string;
}

export type Session = PublicSession | VipSession;

// Props pour SessionCard
export interface SessionCardProps {
  session: Session;
  isExpanded: boolean;
  onPress: () => void;
  onJoinSession?: (session: Session) => void;
  isUnlocked?: boolean;
  onUnlockRequest?: (sessionId: string) => void;
  onEdit?: (session: Session) => void;
}

// Type pour les filtres de langue
export interface LanguageFilter {
  id: string;
  label: string;
  flag: string;
}

// Types Supabase - Structure de la base de données
export interface DatabaseMeeting {
  id: string;
  title: string;
  region: string | null;
  type: 'meeting' | 'public_session' | 'vip_session';
  category: 'public' | 'private';
  platform: string | null;
  link: string;
  zoom_id: string | null;
  password: string | null;
  date: string;
  time: string;
  duration: number;
  organizer: string;
  instructor: string | null;
  max_participants: number | null;
  notes: string | null;
  tags: string[] | null;
  is_recurring: boolean | null;
  recurrence_pattern: string | null;
  language: string | null;
  languages: string[] | null;
  phone_numbers: string[] | null;
  schedule: string | null;
  time_zone: string | null;
  day: string | string[] | null;
  description: { en?: string; fr?: string } | null;
  metadata: Record<string, any> | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  updated_by: string | null;
}

// Type pour la création/mise à jour d'une réunion
export interface CreateMeetingInput {
  title: string;
  region?: string;
  type: 'meeting' | 'public_session' | 'vip_session';
  category: 'public' | 'private';
  platform?: string;
  link: string;
  zoom_id?: string;
  password?: string;
  date: string;
  time: string;
  duration: number;
  organizer: string;
  instructor?: string;
  max_participants?: number;
  notes?: string;
  tags?: string[];
  is_recurring?: boolean;
  recurrence_pattern?: string;
  language?: string;
  languages?: string[];
  phone_numbers?: string[];
  schedule?: string;
  time_zone?: string;
  day?: string | string[];
  description?: { en?: string; fr?: string };
  metadata?: Record<string, any>;
  created_by?: string;
  updated_by?: string;
}

export type UpdateMeetingInput = Partial<CreateMeetingInput> & { id: string };

// Type pour l'historique des modifications
export interface MeetingHistory {
  id: string;
  meeting_id: string;
  action: 'create' | 'update' | 'delete';
  changes: Record<string, any>;
  changed_by: string;
  changed_at: string;
}