/**
 * Hook personnalisé pour la gestion responsive
 * Fournit les informations de taille d'écran et les utilitaires responsive
 */

import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { getResponsiveProps, getResponsiveUnit, getFontSizes, getSpacing, getGridConfig } from '@/utils/responsive';
import type { ResponsiveStyleProps } from '@/types';

/**
 * Hook pour gérer les aspects responsive de l'application
 */
export const useResponsive = () => {
  const [dimensions, setDimensions] = useState(() => Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  const responsiveProps = getResponsiveProps();
  const baseUnit = getResponsiveUnit();
  const fontSizes = getFontSizes();
  const spacing = getSpacing();
  const gridConfig = getGridConfig();

  return {
    dimensions,
    ...responsiveProps,
    baseUnit,
    fontSizes,
    spacing,
    gridConfig,
  };
};