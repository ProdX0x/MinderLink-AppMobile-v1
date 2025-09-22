/**
 * Composant GlassmorphicContainer
 * Container glassmorphique réutilisable avec effet de flou et transparence
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

interface GlassmorphicContainerProps {
  children: React.ReactNode;
  intensity?: number;
  tint?: 'light' | 'dark' | 'default';
  borderRadius?: number;
  style?: ViewStyle;
  gradientColors?: string[];
  gradientLocations?: number[];
  borderColor?: string;
  borderWidth?: number;
  shadowIntensity?: 'light' | 'medium' | 'strong';
}

export const GlassmorphicContainer: React.FC<GlassmorphicContainerProps> = ({
  children,
  intensity = 20,
  tint = 'light',
  borderRadius = 15,
  style,
  gradientColors = [
    'rgba(255, 255, 255, 0.25)',
    'rgba(255, 255, 255, 0.15)',
    'rgba(176, 255, 255, 0.1)',
    'rgba(77, 205, 205, 0.05)'
  ],
  gradientLocations = [0, 0.3, 0.7, 1],
  borderColor = 'rgba(255, 255, 255, 0.3)',
  borderWidth = 1,
  shadowIntensity = 'medium',
}) => {
  const shadowStyles = {
    light: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 3,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 6,
    },
    strong: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.25,
      shadowRadius: 16,
      elevation: 10,
    },
  };

  return (
    <View style={[
      styles.container,
      {
        borderRadius,
        borderColor,
        borderWidth,
        ...shadowStyles[shadowIntensity],
      },
      style
    ]}>
      {/* Effet de flou d'arrière-plan */}
      <BlurView
        intensity={intensity}
        tint={tint}
        style={[styles.blurView, { borderRadius }]}
      />
      
      {/* Dégradé glassmorphique */}
      <LinearGradient
        colors={gradientColors}
        locations={gradientLocations}
        style={[styles.gradient, { borderRadius }]}
      />
      
      {/* Reflet subtil en haut */}
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.2)', 'transparent']}
        locations={[0, 0.3]}
        style={[styles.highlight, { borderRadius }]}
      />
      
      {/* Contenu */}
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  highlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '30%',
  },
  content: {
    position: 'relative',
    zIndex: 1,
  },
});