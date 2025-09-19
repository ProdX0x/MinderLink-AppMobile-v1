/**
 * Composant FilterButton réutilisable
 * Bouton de filtre avec état actif/inactif et support de l'accessibilité
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import type { FilterButtonProps } from '@/types';
import { getFilterAccessibilityDescription } from '@/utils/accessibility';
import { useResponsive } from '@/hooks/useResponsive';

export const FilterButton: React.FC<FilterButtonProps> = ({
  label,
  isActive,
  onPress,
  icon,
}) => {
  const { fontSizes, spacing } = useResponsive();

  const accessibilityLabel = getFilterAccessibilityDescription('général', label, isActive);

  return (
    <TouchableOpacity
      style={styles.filterButton}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={{ selected: isActive }}
    >
      {isActive ? (
        <LinearGradient
          colors={['#FFE0B3', '#FFC266', '#FF9933', '#E67A00', '#CC5500']}
          locations={[0, 0.15, 0.4, 0.7, 1]}
          style={styles.filterButtonGradient}
        >
          <View style={styles.filterButtonContent}>
            {icon && <Text style={styles.iconActive}>{icon}</Text>}
            <Text style={styles.filterButtonTextActive}>
              {label}
            </Text>
          </View>
        </LinearGradient>
      ) : (
        <View style={styles.filterButtonInactive}>
          {icon && <Text style={styles.icon}>{icon}</Text>}
          <Text style={styles.filterButtonText}>
            {label}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  filterButton: {
    borderRadius: 20,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  filterButtonGradient: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: '#F4A460',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
  filterButtonInactive: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  filterButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4A5568',
  },
  filterButtonTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  icon: {
    fontSize: 16,
    marginRight: 6,
  },
  iconActive: {
    fontSize: 16,
    marginRight: 6,
  },
});