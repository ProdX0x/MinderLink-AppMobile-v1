/**
 * Composant Header réutilisable
 * En-tête avec bouton retour et titre, configurable
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { GlassmorphicContainer } from './GlassmorphicContainer';
import type { HeaderProps } from '@/types';
import { getButtonAccessibilityProps } from '@/utils/accessibility';
import { useResponsive } from '@/hooks/useResponsive';

export const Header: React.FC<HeaderProps> = ({
  title,
  onBackPress,
  rightComponent,
}) => {
  const { fontSizes, spacing } = useResponsive();

  const backButtonAccessibility = getButtonAccessibilityProps(
    'Retour',
    'Revenir à l\'écran précédent'
  );

  return (
    <GlassmorphicContainer
      style={styles.header}
      intensity={25}
      gradientColors={[
        'rgba(255, 255, 255, 0.3)',
        'rgba(176, 255, 255, 0.2)',
        'rgba(77, 205, 205, 0.1)',
        'rgba(42, 153, 153, 0.05)'
      ]}
      borderRadius={0}
      borderWidth={0}
      shadowIntensity="light"
    >
      <View style={styles.headerContent}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBackPress}
          {...backButtonAccessibility}
        >
          <ArrowLeft size={24} color="#4A5568" />
        </TouchableOpacity>
        
        <Text
          style={[styles.headerTitle, { fontSize: fontSizes.lg }]}
          accessibilityRole="header"
          accessibilityLabel={`Titre de la page: ${title}`}
        >
          {title}
        </Text>
        
        <View style={styles.rightContainer}>
          {rightComponent || <View style={styles.placeholder} />}
        </View>
      </View>
    </GlassmorphicContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontWeight: '600',
    color: '#2D3748',
    flex: 1,
    textAlign: 'center',
  },
  rightContainer: {
    minWidth: 40,
    alignItems: 'flex-end',
  },
  placeholder: {
    width: 40,
  },
});