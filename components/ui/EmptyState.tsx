/**
 * Composant EmptyState réutilisable
 * Affichage d'état vide avec icône, titre et message
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useResponsive } from '@/hooks/useResponsive';

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  message,
  icon,
}) => {
  const { fontSizes, spacing } = useResponsive();

  return (
    <View style={styles.container}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      
      <Text
        style={[styles.title, { fontSize: fontSizes.lg }]}
        accessibilityRole="header"
      >
        {title}
      </Text>
      
      <Text
        style={[styles.message, { fontSize: fontSizes.md }]}
        accessibilityRole="text"
      >
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    color: '#718096',
    textAlign: 'center',
    lineHeight: 20,
  },
});