/**
 * Utilitaires pour l'accessibilité
 * Fonctions pour améliorer l'expérience utilisateur inclusive
 */

import type { AccessibilityProps } from '@/types';

/**
 * Génère les props d'accessibilité pour un bouton
 */
export const getButtonAccessibilityProps = (
  label: string,
  hint?: string,
  isSelected?: boolean,
  isDisabled?: boolean
): AccessibilityProps => ({
  accessibilityLabel: label,
  accessibilityHint: hint,
  accessibilityRole: 'button',
  accessibilityState: {
    selected: isSelected,
    disabled: isDisabled,
  },
});

/**
 * Génère les props d'accessibilité pour un élément de liste
 */
export const getListItemAccessibilityProps = (
  label: string,
  hint?: string,
  isExpanded?: boolean
): AccessibilityProps => ({
  accessibilityLabel: label,
  accessibilityHint: hint,
  accessibilityRole: 'button',
  accessibilityState: {
    expanded: isExpanded,
  },
});

/**
 * Génère les props d'accessibilité pour un champ de texte
 */
export const getTextInputAccessibilityProps = (
  label: string,
  hint?: string,
  isRequired?: boolean
): AccessibilityProps => ({
  accessibilityLabel: label,
  accessibilityHint: hint,
  accessibilityRole: 'text',
  accessibilityState: {
    disabled: false,
  },
});

/**
 * Génère les props d'accessibilité pour un élément informatif
 */
export const getInfoAccessibilityProps = (
  label: string,
  hint?: string
): AccessibilityProps => ({
  accessibilityLabel: label,
  accessibilityHint: hint,
  accessibilityRole: 'text',
});

/**
 * Formate un texte pour les lecteurs d'écran
 */
export const formatForScreenReader = (text: string): string => {
  return text
    .replace(/([A-Z])/g, ' $1') // Ajoute des espaces avant les majuscules
    .replace(/\s+/g, ' ') // Normalise les espaces multiples
    .trim();
};

/**
 * Génère une description accessible pour une session
 */
export const getSessionAccessibilityDescription = (
  region: string,
  date: string,
  time: string,
  duration: number,
  instructor: string
): string => {
  return `Session de méditation en ${region}, le ${date} à ${time}, durée ${duration} minutes, avec ${instructor}`;
};

/**
 * Génère une description accessible pour un filtre
 */
export const getFilterAccessibilityDescription = (
  filterType: string,
  filterValue: string,
  isActive: boolean
): string => {
  const status = isActive ? 'sélectionné' : 'non sélectionné';
  return `Filtre ${filterType}: ${filterValue}, ${status}`;
};