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