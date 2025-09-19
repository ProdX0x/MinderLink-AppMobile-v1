/**
 * Composant FilterBar réutilisable
 * Barre de filtres horizontale avec boutons de filtre
 */

import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { FilterButton } from './FilterButton';
import type { DayFilter, LanguageFilter } from '@/types';

interface FilterBarProps {
  filters: (DayFilter | LanguageFilter)[];
  selectedFilter: string | null;
  onFilterSelect: (filterId: string | null) => void;
  allLabel?: string;
  showIcons?: boolean;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  selectedFilter,
  onFilterSelect,
  allLabel = 'Tous',
  showIcons = false,
}) => {
  const isLanguageFilter = (filter: DayFilter | LanguageFilter): filter is LanguageFilter => {
    return 'flag' in filter;
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.filterContainer}
      contentContainerStyle={styles.filterContent}
    >
      {/* Bouton "Tous" */}
      <FilterButton
        label={allLabel}
        isActive={selectedFilter === null}
        onPress={() => onFilterSelect(null)}
      />
      
      {/* Boutons de filtre */}
      {filters.map((filter) => (
        <FilterButton
          key={filter.id}
          label={filter.label}
          isActive={selectedFilter === filter.id}
          onPress={() => onFilterSelect(filter.id)}
          icon={showIcons && isLanguageFilter(filter) ? filter.flag : undefined}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    marginBottom: 10,
  },
  filterContent: {
    paddingHorizontal: 24,
  },
});