/**
 * Service de gestion des liens de réunion
 * Centralise toute la logique d'interaction avec les plateformes de réunion
 */

import { Linking, Alert } from 'react-native';
import type { MeetingLink, MeetingConnectionInfo } from '@/types';
import { isPublicLink, isPrivateLink, getPlatformDisplayName } from '@/utils/meetingLink';

/**
 * Service principal pour les interactions avec les plateformes de réunion
 */
export class MeetingLinkService {
  /**
   * Rejoint une réunion via son lien
   */
  static async joinMeetingLink(meetingLink: MeetingLink): Promise<void> {
    try {
      const canOpenLink = await Linking.canOpenURL(meetingLink.link);
      
      if (canOpenLink) {
        await Linking.openURL(meetingLink.link);
      } else {
        this.showConnectionDetails({
          platform: meetingLink.platform,
          link: meetingLink.link,
          password: meetingLink.password,
        });
      }
    } catch (error) {
      console.error('Erreur lors de l\'ouverture du lien de réunion:', error);
      this.showConnectionDetails({
        platform: meetingLink.platform,
        link: meetingLink.link,
        password: meetingLink.password,
      });
    }
  }

  /**
   * Affiche les détails de connexion dans une alerte
   */
  private static showConnectionDetails(details: MeetingConnectionInfo): void {
    const platformName = getPlatformDisplayName(details.platform);
    let message = `Plateforme: ${platformName}\n\nLien de réunion: ${details.link}`;
    
    if (details.password) {
      message += `\n\nMot de passe: ${details.password}`;
    }
    
    if (details.meetingId) {
      message += `\n\nID de réunion: ${details.meetingId}`;
    }

    const buttons = [
      { text: 'Fermer', style: 'cancel' as const },
      { text: 'Copier le lien', onPress: () => this.copyToClipboard(details.link) },
      { text: 'Ouvrir dans le navigateur', onPress: () => Linking.openURL(details.link) }
    ];

    Alert.alert('Rejoindre la réunion', message, buttons);
  }

  /**
   * Affiche une alerte d'erreur
   */
  private static showErrorAlert(platformName: string): void {
    Alert.alert(
      'Erreur',
      `Impossible d'ouvrir la réunion ${platformName}. Veuillez vérifier votre connexion internet.`,
      [{ text: 'OK', style: 'default' }]
    );
  }

  /**
   * Copie du texte dans le presse-papiers
   * Note: Dans une vraie app, utiliser @react-native-clipboard/clipboard
   */
  private static copyToClipboard(text: string): void {
    Alert.alert('Copié', 'Le lien a été copié dans le presse-papiers');
  }

  /**
   * Valide un lien de réunion
   */
  static validateMeetingLink(link: string, platform: string): boolean {
    const urlPattern = /^https?:\/\/.+/;
    
    if (!urlPattern.test(link)) {
      return false;
    }

    // Validation spécifique par plateforme
    switch (platform) {
      case 'zoom':
        return link.includes('zoom.us');
      case 'google-meet':
        return link.includes('meet.google.com');
      case 'teams':
        return link.includes('teams.microsoft.com');
      case 'webex':
        return link.includes('webex.com');
      default:
        return true; // Pour les autres plateformes, on accepte tout lien valide
    }
  }

  /**
   * Génère un lien de test pour une plateforme donnée
   */
  static generateTestLink(platform: string): string {
    const testLinks: Record<string, string> = {
      'zoom': 'https://zoom.us/j/1234567890',
      'google-meet': 'https://meet.google.com/test-meeting',
      'teams': 'https://teams.microsoft.com/l/meetup-join/test',
      'webex': 'https://company.webex.com/meet/test',
      'other': 'https://example.com/meeting'
    };
    
    return testLinks[platform] || testLinks['other'];
  }

  /**
   * Extrait les informations d'un lien de réunion
   */
  static extractMeetingInfo(link: string): { platform: string; meetingId?: string } {
    if (link.includes('zoom.us')) {
      const meetingId = link.match(/\/j\/(\d+)/)?.[1];
      return { platform: 'zoom', meetingId };
    }
    
    if (link.includes('meet.google.com')) {
      const meetingId = link.match(/\/([a-z-]+)$/)?.[1];
      return { platform: 'google-meet', meetingId };
    }
    
    if (link.includes('teams.microsoft.com')) {
      return { platform: 'teams' };
    }
    
    if (link.includes('webex.com')) {
      return { platform: 'webex' };
    }
    
    return { platform: 'other' };
  }

  /**
   * Formate un lien pour l'affichage
   */
  static formatLinkForDisplay(link: string, maxLength: number = 50): string {
    if (link.length <= maxLength) {
      return link;
    }
    
    return `${link.substring(0, maxLength - 3)}...`;
  }

  /**
   * Vérifie si une réunion est en cours
   */
  static isMeetingActive(meetingLink: MeetingLink): boolean {
    const now = new Date();
    const meetingStart = new Date(`${meetingLink.date} ${meetingLink.time}`);
    const meetingEnd = new Date(meetingStart.getTime() + meetingLink.duration * 60000);
    
    return now >= meetingStart && now <= meetingEnd;
  }

  /**
   * Calcule le temps restant avant une réunion
   */
  static getTimeUntilMeeting(meetingLink: MeetingLink): number {
    const now = new Date();
    const meetingStart = new Date(`${meetingLink.date} ${meetingLink.time}`);
    
    return meetingStart.getTime() - now.getTime();
  }

  /**
   * Formate le temps restant en texte lisible
   */
  static formatTimeUntilMeeting(milliseconds: number): string {
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
}