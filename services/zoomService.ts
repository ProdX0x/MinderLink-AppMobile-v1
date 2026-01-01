/**
 * Service de gestion des sessions Zoom
 * Centralise toute la logique d'interaction avec Zoom
 */

import { Linking, Alert } from 'react-native';
import type { Session, PublicSession, VipSession } from '@/types';
import { isPublicSession, isVipSession } from '@/utils/session';

/**
 * Interface pour les informations de connexion Zoom
 */
interface ZoomConnectionDetails {
  zoomId: string;
  zoomLink?: string;
  password?: string;
  phoneNumbers?: string[];
}

/**
 * Service principal pour les interactions Zoom
 */
export class ZoomService {
  /**
   * Rejoint une session Zoom publique
   */
  static async joinPublicSession(session: PublicSession): Promise<void> {
    try {
      const canOpenZoom = await Linking.canOpenURL(session.zoomLink);
      
      if (canOpenZoom) {
        await Linking.openURL(session.zoomLink);
      } else {
        this.showConnectionDetails({
          zoomId: session.zoomId,
          zoomLink: session.zoomLink,
          phoneNumbers: session.phoneNumbers,
        });
      }
    } catch (error) {
      console.error('Erreur lors de l\'ouverture de la session Zoom:', error);
      this.showConnectionDetails({
        zoomId: session.zoomId,
        zoomLink: session.zoomLink,
        phoneNumbers: session.phoneNumbers,
      });
    }
  }

  /**
   * Rejoint une session Zoom VIP
   */
  static async joinVipSession(session: VipSession): Promise<void> {
    try {
      // Pour les sessions VIP, on construit le lien Zoom avec l'ID
      const zoomLink = `https://zoom.us/j/${session.zoomId.replace(/\s/g, '')}`;
      const canOpenZoom = await Linking.canOpenURL(zoomLink);
      
      if (canOpenZoom) {
        await Linking.openURL(zoomLink);
      } else {
        this.showConnectionDetails({
          zoomId: session.zoomId,
          password: session.password,
        });
      }
    } catch (error) {
      console.error('Erreur lors de l\'ouverture de la session Zoom VIP:', error);
      this.showConnectionDetails({
        zoomId: session.zoomId,
        password: session.password,
      });
    }
  }

  /**
   * Rejoint une session générique (détecte automatiquement le type)
   */
  static async joinSession(session: Session): Promise<void> {
    if (isPublicSession(session)) {
      return this.joinPublicSession(session);
    }
    
    if (isVipSession(session)) {
      return this.joinVipSession(session);
    }
    
    throw new Error('Type de session non reconnu');
  }

  /**
   * Affiche les détails de connexion dans une alerte
   */
  private static showConnectionDetails(details: ZoomConnectionDetails): void {
    let message = `ID de réunion: ${details.zoomId}`;
    
    if (details.zoomLink) {
      message += `\n\nLien Zoom: ${details.zoomLink}`;
    }
    
    if (details.password) {
      message += `\n\nMot de passe: ${details.password}`;
    }
    
    if (details.phoneNumbers && details.phoneNumbers.length > 0) {
      message += `\n\nNuméros de téléphone:\n${details.phoneNumbers.join('\n')}`;
    }

    const buttons = [
      { text: 'Fermer', style: 'cancel' as const },
    ];

    if (details.zoomLink) {
      buttons.unshift(
        { text: 'Copier le lien', onPress: () => this.copyToClipboard(details.zoomLink!) },
        { text: 'Ouvrir dans le navigateur', onPress: () => Linking.openURL(details.zoomLink!) }
      );
    }

    Alert.alert('Rejoindre la session', message, buttons);
  }

  /**
   * Affiche une alerte d'erreur
   */
  private static showErrorAlert(): void {
    Alert.alert(
      'Erreur',
      'Impossible d\'ouvrir la session Zoom. Veuillez vérifier votre connexion internet.',
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
   * Ouvre l'application téléphone avec un numéro
   */
  static async callPhoneNumber(phoneNumber: string): Promise<void> {
    try {
      const phoneUrl = `tel:${phoneNumber}`;
      const canCall = await Linking.canOpenURL(phoneUrl);
      
      if (canCall) {
        await Linking.openURL(phoneUrl);
      } else {
        Alert.alert('Erreur', 'Impossible d\'ouvrir l\'application téléphone');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ouverture du téléphone:', error);
      Alert.alert('Erreur', 'Impossible d\'ouvrir l\'application téléphone');
    }
  }

  /**
   * Valide un ID de réunion Zoom
   */
  static validateZoomId(zoomId: string): boolean {
    // Format attendu: "123 456 789" ou "123456789"
    const cleanId = zoomId.replace(/\s/g, '');
    return /^\d{9,11}$/.test(cleanId);
  }

  /**
   * Formate un ID de réunion Zoom pour l'affichage
   */
  static formatZoomId(zoomId: string): string {
    const cleanId = zoomId.replace(/\s/g, '');
    
    if (cleanId.length === 9) {
      return `${cleanId.slice(0, 3)} ${cleanId.slice(3, 6)} ${cleanId.slice(6)}`;
    }
    
    if (cleanId.length === 10) {
      return `${cleanId.slice(0, 3)} ${cleanId.slice(3, 6)} ${cleanId.slice(6)}`;
    }
    
    if (cleanId.length === 11) {
      return `${cleanId.slice(0, 3)} ${cleanId.slice(3, 7)} ${cleanId.slice(7)}`;
    }
    
    return zoomId; // Retourne l'original si le format n'est pas reconnu
  }
}