/**
 * Composant AudioPlayer réutilisable
 * Lecteur audio pour la méditation avec design harmonieux
 */

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Audio } from 'expo-av';
import { Play, Pause, RotateCcw } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useResponsive } from '@/hooks/useResponsive';

interface AudioPlayerProps {
  audioUrl: string;
  title?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioUrl,
  title = "Méditation pour la paix"
}) => {
  const { baseUnit } = useResponsive();
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);
  const [position, setPosition] = useState<number>(0);
  
  // Animation pour le bouton play/pause
  const scaleAnim = new Animated.Value(1);
  const rotateAnim = new Animated.Value(0);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    // Animation de rotation continue pendant la lecture
    if (isPlaying) {
      const rotateAnimation = Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        })
      );
      rotateAnimation.start();
      return () => rotateAnimation.stop();
    } else {
      rotateAnim.setValue(0);
    }
  }, [isPlaying]);

  const loadAudio = async () => {
    try {
      setIsLoading(true);
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: false }
      );
      
      setSound(newSound);
      
      // Obtenir la durée
      const status = await newSound.getStatusAsync();
      if (status.isLoaded && status.durationMillis) {
        setDuration(status.durationMillis);
      }
      
      // Configurer le callback de mise à jour
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setPosition(status.positionMillis || 0);
          setIsPlaying(status.isPlaying || false);
          
          // Arrêt automatique à la fin
          if (status.didJustFinish) {
            setIsPlaying(false);
            setPosition(0);
          }
        }
      });
      
      return newSound;
    } catch (error) {
      console.error('Erreur lors du chargement de l\'audio:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const playPauseAudio = async () => {
    try {

      // Animation du bouton
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();

      let currentSound = sound;
      
      if (!currentSound) {
        currentSound = await loadAudio();
        if (!currentSound) {
          return;
        }
      }
      if (isPlaying) {
        await currentSound.pauseAsync();
      } else {
        await currentSound.playAsync();
      }
    } catch (error) {
      console.error('Erreur lors de la lecture/pause:', error);
    }
  };

  const resetAudio = async () => {
    try {
      if (sound) {
        await sound.setPositionAsync(0);
        setPosition(0);
        if (isPlaying) {
          await sound.pauseAsync();
        }
      }
    } catch (error) {
      console.error('Erreur lors de la remise à zéro:', error);
    }
  };

  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration ? (position / duration) * 100 : 0;

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      {/* Titre */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>1 minute de paix intérieure</Text>
      </View>

      {/* Lecteur principal */}
      <View style={styles.playerContainer}>
        <LinearGradient
          colors={[
            'rgba(255, 255, 255, 0.3)',
            'rgba(42, 153, 153, 0.35)',
            'rgba(42, 153, 153, 0.45)',
            'rgba(32, 123, 123, 0.5)'
          ]}
          locations={[0, 0.2, 0.5, 0.8]}
          style={styles.playerGradient}
        >
          {/* Barre de progression */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${progressPercentage}%` }
                ]} 
              />
            </View>
            <Text style={styles.timeText}>
              {duration ? `${formatTime(position)} / ${formatTime(duration)}` : '0:00 / 1:00'}
            </Text>
          </View>

          {/* Contrôles */}
          <View style={styles.controlsContainer}>
            {/* Bouton Reset */}
            <TouchableOpacity
              style={styles.resetButton}
              onPress={resetAudio}
              disabled={!sound || isLoading}
              activeOpacity={0.7}
            >
              <RotateCcw size={20} color="#FFFFFF" />
            </TouchableOpacity>

            {/* Bouton Play/Pause principal */}
            <TouchableOpacity
              onPress={playPauseAudio}
              disabled={isLoading}
              activeOpacity={0.8}
              style={styles.playButtonContainer}
            >
              <Animated.View
                style={[
                  { transform: [{ scale: scaleAnim }, { rotate: spin }] }
                ]}
              >
                <LinearGradient
                  colors={['#FFE0B3', '#FFC266', '#FF9933', '#E67A00', '#CC5500']}
                  locations={[0, 0.15, 0.4, 0.7, 1]}
                  style={styles.playButton}
                >
                  {isLoading ? (
                    <View style={styles.loadingDot} />
                  ) : isPlaying ? (
                    <Pause size={32} color="#FFFFFF" />
                  ) : (
                    <Play size={32} color="#FFFFFF" />
                  )}
                </LinearGradient>
              </Animated.View>
            </TouchableOpacity>

            {/* Espace pour équilibrer */}
            <View style={styles.spacer} />
          </View>
        </LinearGradient>
      </View>

      {/* Indication */}
      <Text style={styles.hint}>
        {isLoading ? 'Chargement...' : isPlaying ? 'En cours de lecture' : 'Appuyez pour écouter'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
    textAlign: 'center',
  },
  
  subtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  
  playerContainer: {
    width: '100%',
    maxWidth: 320,
    marginBottom: 16,
  },
  
  playerGradient: {
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  
  progressContainer: {
    marginBottom: 20,
  },
  
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    marginBottom: 8,
    overflow: 'hidden',
  },
  
  progressFill: {
    height: '100%',
    backgroundColor: '#F4A460',
    borderRadius: 2,
  },
  
  timeText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  resetButton: {
    padding: 12,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  
  playButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#F4A460',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
  },
  
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  
  spacer: {
    width: 44,
  },
  
  hint: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    fontStyle: 'italic',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});