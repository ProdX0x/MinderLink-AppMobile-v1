/**
 * Types globaux de l'application OMFP
 * Centralise toutes les définitions de types pour assurer la cohérence
 */

// Types de base pour les sessions
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

// Session publique avec informations spécifiques
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

// Session VIP avec informations spécifiques
export interface VipSession extends BaseSession {
  type: 'vip';
  password: string;
}

// Union type pour toutes les sessions
export type Session = PublicSession | VipSession;

// Types pour les filtres
export interface DayFilter {
  id: string;
  label: string;
}

export interface LanguageFilter {
  id: string;
  label: string;
  flag: string;
}

// Types pour les props des composants
export interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
  icon?: string;
}

export interface SessionCardProps {
  session: Session;
  isExpanded: boolean;
  onPress: () => void;
  onJoinSession?: (session: Session) => void;
  isUnlocked?: boolean;
  onUnlockRequest?: (sessionId: string) => void;
}

export interface HeaderProps {
  title: string;
  onBackPress: () => void;
  rightComponent?: React.ReactNode;
}

// Types pour les hooks
export interface UseSessionFiltersReturn {
  selectedDay: string | null;
  selectedLanguage: string | null;
  setSelectedDay: (day: string | null) => void;
  setSelectedLanguage: (language: string | null) => void;
  filteredSessions: Session[];
}

export interface UseVipAuthReturn {
  isAuthenticated: boolean;
  authenticate: (password: string) => Promise<boolean>;
  logout: () => void;
}

// Types pour les services
export interface ZoomConnectionInfo {
  zoomId: string;
  zoomLink?: string;
  password?: string;
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