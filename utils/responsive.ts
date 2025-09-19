/**
 * Utilitaires pour la gestion responsive
 * Centralise la logique de calcul des dimensions et unités adaptatives
 */

import { Dimensions } from 'react-native';
import type { ResponsiveStyleProps } from '@/types';

const { width, height } = Dimensions.get('window');

/**
 * Détection précise des types d'écrans
 */
export const getScreenType = () => {
  const isSmallPhone = height < 700;
  const isMediumPhone = height >= 700 && height < 800;
  const isLargePhone = height >= 800;

  return {
    isSmallPhone,
    isMediumPhone,
    isLargePhone,
  };
};

/**
 * Calcul de l'unité de base responsive
 */
export const getResponsiveUnit = (): number => {
  const { isSmallPhone, isMediumPhone, isLargePhone } = getScreenType();
  
  if (isSmallPhone) return 4;
  if (isMediumPhone) return 5;
  if (isLargePhone) return 6;
  return 5; // Fallback
};

/**
 * Distribution d'espace optimisée pour smartphones
 */
export const getLayoutDistribution = () => {
  const { isSmallPhone, isMediumPhone } = getScreenType();
  
  if (isSmallPhone) {
    return { header: 0.25, action: 0.35, language: 0.4 };
  }
  if (isMediumPhone) {
    return { header: 0.3, action: 0.35, language: 0.35 };
  }
  return { header: 0.3, action: 0.2, language: 0.3 };
};

/**
 * Configuration de grille responsive
 */
export const getGridConfig = () => {
  const columns = width < 350 ? 2 : 3;
  const baseUnit = getResponsiveUnit();
  const horizontalPadding = baseUnit * 8;
  const itemSpacing = baseUnit * 2 * (columns - 1);
  const availableWidth = width - horizontalPadding - itemSpacing;
  const itemWidth = availableWidth / columns;
  const maxItemHeight = baseUnit * 12;
  const calculatedHeight = Math.min(itemWidth * 0.8, maxItemHeight);
  
  return {
    columns,
    itemWidth,
    itemHeight: calculatedHeight,
    spacing: baseUnit * 2,
  };
};

/**
 * Props responsive pour les composants
 */
export const getResponsiveProps = (): ResponsiveStyleProps => {
  const { isSmallPhone, isMediumPhone, isLargePhone } = getScreenType();
  
  return {
    isSmallScreen: isSmallPhone,
    isMediumScreen: isMediumPhone,
    isLargeScreen: isLargePhone,
    screenWidth: width,
    screenHeight: height,
  };
};

/**
 * Calcul de tailles de police responsive
 */
export const getFontSizes = () => {
  const baseUnit = getResponsiveUnit();
  
  return {
    xs: baseUnit * 1.5,
    sm: baseUnit * 1.8,
    md: baseUnit * 2.2,
    lg: baseUnit * 2.5,
    xl: baseUnit * 3,
    xxl: baseUnit * 4,
    xxxl: baseUnit * 6,
  };
};

/**
 * Calcul d'espacements responsive
 */
export const getSpacing = () => {
  const baseUnit = getResponsiveUnit();
  
  return {
    xs: baseUnit * 0.5,
    sm: baseUnit,
    md: baseUnit * 1.5,
    lg: baseUnit * 2,
    xl: baseUnit * 3,
    xxl: baseUnit * 4,
  };
};