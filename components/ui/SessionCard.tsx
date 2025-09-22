/**
 * Composant SessionCard réutilisable
 * Carte de session avec détails expandables et actions contextuelles
 */

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Calendar, Clock, Users, Lock, Globe } from 'lucide-react-native';
import type { SessionCardProps, LanguageFilter } from '@/types';
import { formatSessionDate, isVipSession, isPublicSession } from '@/utils/session';
import { getSessionAccessibilityDescription } from '@/utils/accessibility';
import { useResponsive } from '@/hooks/useResponsive';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from './Button';
import { GlassmorphicContainer } from './GlassmorphicContainer';

const { height: screenHeight } = Dimensions.get('window');

// Configuration des langues avec drapeaux
const LANGUAGES: LanguageFilter[] = [
  { id: 'fr', label: 'Français', flag: '🇫🇷' },
  { id: 'gb', label: 'English', flag: '🇬🇧' },
  { id: 'it', label: 'Italiano', flag: '🇮🇹' },
  { id: 'jp', label: '日本語', flag: '🇯🇵' },
  { id: 'es', label: 'Español', flag: '🇪🇸' },
  { id: 'de', label: 'Deutsch', flag: '🇩🇪' },
];

export const SessionCard: React.FC<SessionCardProps> = ({
  session,
  isExpanded,
  onPress,
  onJoinSession,
  isUnlocked = false,
  onUnlockRequest,
}) => {
  const { fontSizes, spacing } = useResponsive();
  const { selectedLanguage } = useLanguage();
  const [selectedDescriptionLanguage, setSelectedDescriptionLanguage] = useState<'en' | 'fr'>('en');
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  
  // Utiliser la langue sélectionnée par défaut
  useEffect(() => {
    if (selectedLanguage === 'fr' || selectedLanguage === 'gb') {
      setSelectedDescriptionLanguage(selectedLanguage === 'fr' ? 'fr' : 'en');
    }
  }, [selectedLanguage]);
  
  const selectedLang = LANGUAGES.find(l => l.id === session.language);
  const isVip = isVipSession(session);
  const isPublic = isPublicSession(session);

  const accessibilityDescription = getSessionAccessibilityDescription(
    session.region,
    formatSessionDate(session.date),
    session.time,
    session.duration,
    session.instructor
  );

  const handleJoinPress = () => {
    if (onJoinSession) {
      onJoinSession(session);
    }
  };

  const handleUnlockPress = () => {
    if (onUnlockRequest) {
      onUnlockRequest(session.id);
    }
  };

  const canJoin = isPublic || (isVip && isUnlocked);

  return (
    <GlassmorphicContainer
      style={[
        styles.sessionCard,
        { borderLeftColor: isVip ? '#F4A460' : '#48BB78' }
      ]}
      gradientColors={
        isVip 
          ? [
              'rgba(244, 164, 96, 0.15)',
              'rgba(255, 224, 179, 0.1)',
              'rgba(255, 255, 255, 0.08)',
              'rgba(176, 255, 255, 0.05)'
            ]
          : [
              'rgba(72, 187, 120, 0.15)',
              'rgba(255, 255, 255, 0.12)',
              'rgba(176, 255, 255, 0.08)',
              'rgba(77, 205, 205, 0.05)'
            ]
      }
      shadowIntensity="medium"
    >
      {/* En-tête de la carte - Cliquable pour expansion */}
      <TouchableOpacity
        style={styles.sessionHeader}
        onPress={onPress}
        accessibilityLabel={accessibilityDescription}
        accessibilityHint={isExpanded ? 'Réduire les détails' : 'Afficher les détails'}
        accessibilityRole="button"
        accessibilityState={{ expanded: isExpanded }}
      >
        <View style={styles.sessionInfo}>
          {/* Ligne de titre avec badge */}
          <View style={styles.sessionTitleRow}>
            <Text style={styles.sessionRegion} numberOfLines={2}>
              {session.region}
            </Text>
            <View style={styles.badgeContainer}>
              {selectedLang && (
                <Text style={styles.languageFlag}>{selectedLang.flag}</Text>
              )}
              <View style={[
                styles.typeBadge,
                { backgroundColor: isVip ? '#F4A460' : '#48BB78' }
              ]}>
                {isVip ? (
                  <Lock size={12} color="#FFFFFF" />
                ) : (
                  <Users size={12} color="#FFFFFF" />
                )}
                <Text style={styles.typeBadgeText}>
                  {isVip ? 'VIP' : 'PUBLIC'}
                </Text>
              </View>
            </View>
          </View>
          
          {/* Nom de l'instructeur */}
          <Text style={styles.instructorName}>Avec {session.instructor}</Text>
          
          {/* Détails de la session */}
          <View style={styles.sessionDetails}>
            <View style={styles.detailItem}>
              <Calendar size={16} color="#718096" />
              <Text style={styles.detailText}>{formatSessionDate(session.date)}</Text>
            </View>
            <View style={styles.detailItem}>
              <Clock size={16} color="#718096" />
              <Text style={styles.detailText}>{session.time}</Text>
            </View>
            <View style={styles.detailItem}>
              <Users size={16} color="#718096" />
              <Text style={styles.detailText}>{session.duration}min</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {/* Détails expandables */}
      {isExpanded && (
        <View style={styles.sessionExpanded}>
          {/* Informations détaillées */}
          <View style={styles.sessionInfoDetailed}>
            <Text style={styles.participantsInfo}>
              Maximum {session.maxParticipants} participants
            </Text>
            
            {/* Informations spécifiques aux sessions publiques */}
            {isPublic && (
              <>
                <Text style={styles.scheduleInfo}>
                  {session.schedule}
                </Text>
                <Text style={styles.languagesInfo}>
                  Langues: {session.languages.join(', ')}
                </Text>
              </>
            )}
          </View>

          {/* Description bilingue pour les sessions publiques */}
          {isPublic && (
            <View style={styles.descriptionSection}>
              <TouchableOpacity
                style={styles.descriptionToggle}
                onPress={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                accessibilityLabel={isDescriptionExpanded ? "Replier la description" : "Voir la description complète"}
                accessibilityRole="button"
                accessibilityState={{ expanded: isDescriptionExpanded }}
              >
                <Text style={styles.descriptionToggleText}>
                  Description : {isDescriptionExpanded ? '▲ Replier' : '▼ Voir plus'}
                </Text>
              </TouchableOpacity>
              
              {isDescriptionExpanded && (
                <View style={styles.descriptionExpandedContainer}>
                  <View style={styles.languageToggleContainer}>
                    <TouchableOpacity
                      style={[
                        styles.languageToggleButton,
                        selectedDescriptionLanguage === 'en' && styles.languageToggleButtonActive
                      ]}
                      onPress={() => setSelectedDescriptionLanguage('en')}
                      accessibilityLabel="Afficher la description en anglais"
                      accessibilityRole="button"
                      accessibilityState={{ selected: selectedDescriptionLanguage === 'en' }}
                    >
                      <Text style={[
                        styles.languageToggleText,
                        selectedDescriptionLanguage === 'en' && styles.languageToggleTextActive
                      ]}>
                        EN
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.languageToggleButton,
                        selectedDescriptionLanguage === 'fr' && styles.languageToggleButtonActive
                      ]}
                      onPress={() => setSelectedDescriptionLanguage('fr')}
                      accessibilityLabel="Afficher la description en français"
                      accessibilityRole="button"
                      accessibilityState={{ selected: selectedDescriptionLanguage === 'fr' }}
                    >
                      <Text style={[
                        styles.languageToggleText,
                        selectedDescriptionLanguage === 'fr' && styles.languageToggleTextActive
                      ]}>
                        FR
                      </Text>
                    </TouchableOpacity>
                  </View>
                  
                  <ScrollView 
                    style={[styles.descriptionScrollContainer, { maxHeight: screenHeight * 0.2 }]}
                    showsVerticalScrollIndicator={true}
                    nestedScrollEnabled={true}
                  >
                    <Text style={styles.descriptionText}>
                      {session.description[selectedDescriptionLanguage]}
                    </Text>
                  </ScrollView>
                </View>
              )}
            </View>
          )}
          {/* Informations de connexion */}
          <View style={styles.connectionDetails}>
            <Text style={styles.connectionTitle}>Informations de connexion :</Text>
            
            <View style={styles.connectionItem}>
              <Text style={styles.connectionLabel}>ID de réunion :</Text>
              <Text style={styles.connectionValue}>{session.zoomId}</Text>
            </View>

            {/* Mot de passe pour sessions VIP */}
            {isVip && (
              <View style={styles.connectionItem}>
                <Text style={styles.connectionLabel}>Mot de passe :</Text>
                {isUnlocked ? (
                  <Text style={styles.connectionValue}>{session.password}</Text>
                ) : (
                  <GlassmorphicContainer
                    intensity={15}
                    style={styles.passwordVeil}
                    gradientColors={[
                      'rgba(247, 250, 252, 0.6)',
                      'rgba(226, 232, 240, 0.4)',
                      'rgba(255, 255, 255, 0.3)'
                    ]}
                    borderColor="rgba(226, 232, 240, 0.6)"
                    borderWidth={1}
                    shadowIntensity="light"
                  >
                    <TouchableOpacity
                      onPress={handleUnlockPress}
                      accessibilityLabel="Révéler le mot de passe"
                      accessibilityHint="Appuyez pour saisir le mot de passe VIP"
                      style={styles.veilTouchable}
                    >
                      <Text style={styles.veilText}>Cliquez pour révéler</Text>
                    </TouchableOpacity>
                  </GlassmorphicContainer>
                )}
              </View>
            )}

            {/* Lien et téléphones pour sessions publiques */}
            {isPublic && (
              <>
                <View style={styles.connectionItem}>
                  <Text style={styles.connectionLabel}>Lien Zoom :</Text>
                  <Text style={styles.connectionLink}>{session.zoomLink}</Text>
                </View>
                
                <View style={styles.connectionItem}>
                  <Text style={styles.connectionLabel}>Téléphone :</Text>
                  <View style={styles.phoneNumbers}>
                    {session.phoneNumbers.map((phone, index) => (
                      <Text key={index} style={styles.phoneNumber}>{phone}</Text>
                    ))}
                  </View>
                </View>
              </>
            )}
          </View>

          {/* Bouton de participation */}
          <Button
            title={
              canJoin 
                ? `Rejoindre la session ${isVip ? 'VIP' : 'publique'}`
                : 'Déverrouillez d\'abord'
            }
            onPress={handleJoinPress}
            disabled={!canJoin}
            variant={isVip ? 'primary' : 'secondary'}
            icon={isVip ? <Lock size={20} color="#FFFFFF" /> : <Globe size={20} color="#FFFFFF" />}
            accessibilityLabel={`Rejoindre la session de méditation ${session.region}`}
            accessibilityHint={
              canJoin 
                ? 'Ouvre l\'application Zoom pour rejoindre la session'
                : 'Vous devez d\'abord déverrouiller cette session VIP'
            }
          />
        </View>
      )}
    </GlassmorphicContainer>
  );
};

const styles = StyleSheet.create({
  sessionCard: {
    marginBottom: 16,
    borderLeftWidth: 4,
  },
  sessionHeader: {
    padding: 16,
  },
  sessionInfo: {
    flex: 1,
  },
  sessionTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sessionRegion: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    flex: 1,
    marginRight: 12,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0,
  },
  languageFlag: {
    fontSize: 16,
    marginRight: 8,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  instructorName: {
    fontSize: 14,
    color: '#718096',
    fontStyle: 'italic',
    marginBottom: 12,
  },
  sessionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#718096',
    marginLeft: 6,
  },
  sessionExpanded: {
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    padding: 16,
  },
  sessionInfoDetailed: {
    marginBottom: 16,
  },
  participantsInfo: {
    fontSize: 14,
    color: '#4A5568',
    fontWeight: '500',
    marginBottom: 4,
  },
  scheduleInfo: {
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 4,
  },
  languagesInfo: {
    fontSize: 14,
    color: '#4A5568',
    fontWeight: '500',
  },
  descriptionSection: {
    marginBottom: 16,
  },
  descriptionToggle: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  descriptionToggleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4299E1',
  },
  descriptionExpandedContainer: {
    backgroundColor: 'rgba(247, 250, 252, 0.9)',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.6)',
  },
  languageToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    padding: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  languageToggleButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    minWidth: 40,
    alignItems: 'center',
  },
  languageToggleButtonActive: {
    backgroundColor: '#48BB78',
  },
  languageToggleText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#718096',
  },
  languageToggleTextActive: {
    color: '#FFFFFF',
  },
  descriptionScrollContainer: {
    borderRadius: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: '#4A5568',
    lineHeight: 20,
    textAlign: 'justify',
  },
  connectionDetails: {
    marginBottom: 16,
  },
  connectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 12,
  },
  connectionItem: {
    marginBottom: 12,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  connectionLabel: {
    fontSize: 14,
    color: '#4A5568',
    fontWeight: '500',
    marginBottom: 2,
  },
  connectionValue: {
    fontSize: 14,
    color: '#2D3748',
    fontFamily: 'monospace',
    backgroundColor: 'rgba(247, 250, 252, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  connectionLink: {
    fontSize: 14,
    color: '#4299E1',
    textDecorationLine: 'underline',
  },
  passwordVeil: {
    borderRadius: 8,
  },
  veilTouchable: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
  },
  veilText: {
    fontSize: 12,
    color: '#999',
  },
  phoneNumbers: {
    flexDirection: 'column',
  },
  phoneNumber: {
    fontSize: 14,
    color: '#4299E1',
    marginBottom: 2,
  },
});