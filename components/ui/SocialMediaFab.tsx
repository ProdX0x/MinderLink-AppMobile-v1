/**
 * Composant SocialMediaFab
 * Bouton d'action flottant pour les réseaux sociaux avec animation de déploiement
 */

import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withDelay,
  withRepeat,
  withSequence,
  Easing 
} from 'react-native-reanimated';
import { 
  Share2, 
  Facebook, 
  Youtube,
  Globe 
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useResponsive } from '@/hooks/useResponsive';
import { XIcon } from '@/components/icons/XIcon';

// Configuration des réseaux sociaux
const SOCIAL_NETWORKS = [
  {
    id: 'facebook',
    icon: Facebook,
    color: '#1877F2',
    rgb: '24, 119, 242',
    url: 'https://www.facebook.com/1min4peace/',
    name: 'Facebook'
  },
  {
    id: 'youtube',
    icon: Youtube,
    color: '#FF0000',
    rgb: '255, 0, 0',
    url: 'https://www.youtube.com/@1min4peace',
    name: 'YouTube'
  },
  {
    id: 'x',
    icon: XIcon,
    color: '#000000',
    rgb: '0, 0, 0',
    url: 'https://x.com/1min4peace',
    name: 'X'
  },
  {
    id: 'website',
    icon: Globe,
    color: '#4299E1',
    rgb: '66, 153, 225',
    url: 'https://1min4peace.org/',
    name: 'Site Web'
  }
];

interface FabItemProps {
  network: typeof SOCIAL_NETWORKS[0];
  index: number;
  isActive: boolean;
  baseUnit: number;
  onPress: (url: string, name: string) => void;
}

/**
 * Composant FabItem - Bouton individuel de réseau social
 */
const FabItem: React.FC<FabItemProps> = ({ 
  network, 
  index, 
  isActive, 
  baseUnit,
  onPress 
}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);

  React.useEffect(() => {
    const delay = index * 100; // Délai progressif pour chaque bouton
    
    if (isActive) {
      // Positions de déploiement en arc de cercle
      const angle = (index * 44) - 200.5; // Répartition sur 135 degrés
      const radius = baseUnit * 14; // Distance réduite du bouton principal
      const radians = (angle * Math.PI) / 180;
      
      const targetX = Math.cos(radians) * radius;
      const targetY = Math.sin(radians) * radius;

      translateX.value = withDelay(delay, withTiming(targetX, {
        duration: 400,
        easing: Easing.out(Easing.back(1.2))
      }));
      
      translateY.value = withDelay(delay, withTiming(targetY, {
        duration: 400,
        easing: Easing.out(Easing.back(1.2))
      }));
      
      opacity.value = withDelay(delay, withTiming(1, {
        duration: 300,
        easing: Easing.ease
      }));
      
      scale.value = withDelay(delay, withTiming(1, {
        duration: 400,
        easing: Easing.out(Easing.back(1.5))
      }));
    } else {
      // Animation de fermeture
      translateX.value = withTiming(0, {
        duration: 300,
        easing: Easing.in(Easing.ease)
      });
      
      translateY.value = withTiming(0, {
        duration: 300,
        easing: Easing.in(Easing.ease)
      });
      
      opacity.value = withTiming(0, {
        duration: 200,
        easing: Easing.ease
      });
      
      scale.value = withTiming(0, {
        duration: 300,
        easing: Easing.in(Easing.ease)
      });
    }
  }, [isActive, index, baseUnit]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value }
    ],
    opacity: opacity.value,
  }));

  const handlePress = () => {
    onPress(network.url, network.name);
  };

  const IconComponent = network.icon;

  // Calcul de la taille des boutons avec minimum de 40px
  const buttonSize = Math.max(40, baseUnit * 8);
  const iconSize = Math.max(16, baseUnit * 3);
  return (
    <Animated.View style={[styles.fabItem, animatedStyle]}>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.8}
        accessibilityLabel={`Ouvrir ${network.name}`}
        accessibilityRole="button"
        style={[styles.fabButton, { width: buttonSize, height: buttonSize }]}
      >
        <LinearGradient
          colors={[
            'rgba(255, 255, 255, 0.3)',
            `rgba(${network.rgb}, 0.25)`,
            `rgba(${network.rgb}, 0.4)`,
            `rgba(${network.rgb}, 0.55)`
          ]}
          locations={[0, 0.2, 0.6, 1]}
          style={[styles.fabGradient, { borderRadius: buttonSize / 2 }]}
        >
          <IconComponent size={iconSize} color="#FFFFFF" />
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

/**
 * Composant principal SocialMediaFab
 */
export const SocialMediaFab: React.FC = () => {
  const { baseUnit } = useResponsive();
  const [isActive, setIsActive] = useState(false);
  
  const rotation = useSharedValue(0);
  const mainButtonScale = useSharedValue(1);
  const heartbeatScale = useSharedValue(1);

  React.useEffect(() => {
    rotation.value = withTiming(isActive ? 45 : 0, {
      duration: 300,
      easing: Easing.ease
    });
  }, [isActive]);

  // Animation de battement de cœur
  React.useEffect(() => {
    if (!isActive) {
      // Démarrer l'animation de battement quand le menu est fermé
      heartbeatScale.value = withRepeat(
        withSequence(
          withTiming(1.05, {
            duration: 800,
            easing: Easing.inOut(Easing.ease)
          }),
          withTiming(1, {
            duration: 800,
            easing: Easing.inOut(Easing.ease)
          })
        ),
        -1, // Répéter indéfiniment
        false // Ne pas inverser
      );
    } else {
      // Arrêter l'animation et revenir à la taille normale quand le menu est ouvert
      heartbeatScale.value = withTiming(1, {
        duration: 200,
        easing: Easing.ease
      });
    }
  }, [isActive]);
  const mainButtonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotation.value}deg` },
      { scale: mainButtonScale.value * heartbeatScale.value }
    ],
  }));

  const handleMainButtonPress = () => {
    // Animation de feedback tactile
    mainButtonScale.value = withTiming(0.9, { duration: 100 }, () => {
      mainButtonScale.value = withTiming(1, { duration: 100 });
    });
    
    setIsActive(!isActive);
  };

  const handleSocialPress = async (url: string, name: string) => {
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        Alert.alert(
          'Erreur',
          `Impossible d'ouvrir ${name}`,
          [{ text: 'OK', style: 'default' }]
        );
      }
    } catch (error) {
      console.error(`Erreur lors de l'ouverture de ${name}:`, error);
      Alert.alert(
        'Erreur',
        `Une erreur est survenue lors de l'ouverture de ${name}`,
        [{ text: 'OK', style: 'default' }]
      );
    }
  };

  // Calcul de la taille du bouton principal avec minimum de 48px pour l'accessibilité
  const mainButtonSize = Math.max(48, baseUnit * 10);
  const mainIconSize = Math.max(20, baseUnit * 3.5);
  return (
    <View style={[styles.container, { bottom: baseUnit * 4, right: baseUnit * 4 }]}>
      {/* Boutons des réseaux sociaux */}
      {SOCIAL_NETWORKS.map((network, index) => (
        <FabItem
          key={network.id}
          network={network}
          index={index}
          isActive={isActive}
          baseUnit={baseUnit}
          onPress={handleSocialPress}
        />
      ))}
      
      {/* Bouton principal */}
      <TouchableOpacity
        onPress={handleMainButtonPress}
        activeOpacity={0.8}
        accessibilityLabel={isActive ? "Fermer le menu des réseaux sociaux" : "Ouvrir le menu des réseaux sociaux"}
        accessibilityRole="button"
        accessibilityState={{ expanded: isActive }}
        style={[styles.mainButton, { width: mainButtonSize, height: mainButtonSize }]}
      >
        <Animated.View style={mainButtonAnimatedStyle}>
          <LinearGradient
            colors={[
              'rgba(255, 255, 255, 0.4)',
              'rgba(176, 255, 255, 0.7)',
              'rgba(77, 205, 205, 0.8)',
              'rgba(42, 153, 153, 0.9)'
            ]}
            locations={[0, 0.3, 0.7, 1]}
            style={[styles.mainButtonGradient, { borderRadius: mainButtonSize / 2 }]}
          >
            <Share2 size={mainIconSize} color="#FFFFFF" />
          </LinearGradient>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  fabItem: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  fabButton: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  
  fabGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  
  mainButton: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
  
  mainButtonGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
});