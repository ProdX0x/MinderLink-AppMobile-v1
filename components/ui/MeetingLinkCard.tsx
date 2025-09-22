/**
 * Composant MeetingLinkCard réutilisable
 * Carte de lien de réunion avec détails expandables et actions contextuelles
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Calendar, Clock, Users, Lock, Globe, Video, Phone } from 'lucide-react-native';
import { GlassmorphicContainer } from './GlassmorphicContainer';
import type { MeetingLinkCardProps } from '@/types';
import { formatMeetingLinkDate, isPrivateLink, isPublicLink, getPlatformDisplayName, getPlatformIcon } from '@/utils/meetingLink';
import { useResponsive } from '@/hooks/useResponsive';
import { Button } from './Button';
import { MeetingLinkService } from '@/services/meetingLinkService';

const { height: screenHeight } = Dimensions.get('window');

export const MeetingLinkCard: React.FC<MeetingLinkCardProps> = ({
  meetingLink,
  isExpanded,
  onPress,
  onJoinMeeting,
  isUnlocked = false,
  onUnlockRequest,
}) => {
  const { fontSizes, spacing } = useResponsive();
  const isPrivate = isPrivateLink(meetingLink);
  const isPublic = isPublicLink(meetingLink);
  const platformName = getPlatformDisplayName(meetingLink.platform);
  const platformIcon = getPlatformIcon(meetingLink.platform);

  const handleJoinPress = () => {
    if (onJoinMeeting) {
      onJoinMeeting(meetingLink);
    }
  };

  const handleUnlockPress = () => {
    if (onUnlockRequest) {
      onUnlockRequest(meetingLink.id);
    }
  };

  const canJoin = isPublic || (isPrivate && isUnlocked);
  const timeUntilMeeting = MeetingLinkService.getTimeUntilMeeting(meetingLink);
  const timeUntilText = MeetingLinkService.formatTimeUntilMeeting(timeUntilMeeting);
  const isMeetingActive = MeetingLinkService.isMeetingActive(meetingLink);

  const accessibilityDescription = `Réunion ${meetingLink.title}, organisée par ${meetingLink.organizer}, le ${formatMeetingLinkDate(meetingLink.date)} à ${meetingLink.time}, durée ${meetingLink.duration} minutes, plateforme ${platformName}`;

  return (
    <GlassmorphicContainer
      style={[
        styles.meetingCard,
        { borderLeftColor: isPrivate ? '#F4A460' : '#48BB78' },
        isMeetingActive && styles.meetingCardActive
      ]}
      gradientColors={
        isPrivate 
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
      shadowIntensity={isMeetingActive ? 'strong' : 'medium'}
    >
      {/* En-tête de la carte - Cliquable pour expansion */}
      <TouchableOpacity
        style={styles.meetingHeader}
        onPress={onPress}
        accessibilityLabel={accessibilityDescription}
        accessibilityHint={isExpanded ? 'Réduire les détails' : 'Afficher les détails'}
        accessibilityRole="button"
        accessibilityState={{ expanded: isExpanded }}
      >
        <View style={styles.meetingInfo}>
          {/* Ligne de titre avec badge */}
          <View style={styles.meetingTitleRow}>
            <Text style={styles.meetingTitle} numberOfLines={2}>
              {meetingLink.title}
            </Text>
            <View style={styles.badgeContainer}>
              <Text style={styles.platformIcon}>{platformIcon}</Text>
              <View style={[
                styles.categoryBadge,
                { backgroundColor: isPrivate ? '#F4A460' : '#48BB78' }
              ]}>
                {isPrivate ? (
                  <Lock size={12} color="#FFFFFF" />
                ) : (
                  <Globe size={12} color="#FFFFFF" />
                )}
                <Text style={styles.categoryBadgeText}>
                  {isPrivate ? 'PRIVÉ' : 'PUBLIC'}
                </Text>
              </View>
            </View>
          </View>
          
          {/* Organisateur et plateforme */}
          <View style={styles.organizerRow}>
            <Text style={styles.organizerName}>Organisé par {meetingLink.organizer}</Text>
            <Text style={styles.platformName}>{platformName}</Text>
          </View>
          
          {/* Détails de la réunion */}
          <View style={styles.meetingDetails}>
            <View style={styles.detailItem}>
              <Calendar size={16} color="#718096" />
              <Text style={styles.detailText}>{formatMeetingLinkDate(meetingLink.date)}</Text>
            </View>
            <View style={styles.detailItem}>
              <Clock size={16} color="#718096" />
              <Text style={styles.detailText}>{meetingLink.time}</Text>
            </View>
            <View style={styles.detailItem}>
              <Users size={16} color="#718096" />
              <Text style={styles.detailText}>{meetingLink.duration}min</Text>
            </View>
          </View>

          {/* Statut de la réunion */}
          <View style={styles.statusContainer}>
            <Text style={[
              styles.statusText,
              isMeetingActive ? styles.statusActive : styles.statusUpcoming
            ]}>
              {timeUntilText}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Détails expandables */}
      {isExpanded && (
        <View style={styles.meetingExpanded}>
          {/* Informations détaillées */}
          <View style={styles.meetingInfoDetailed}>
            {meetingLink.maxParticipants && (
              <Text style={styles.participantsInfo}>
                Maximum {meetingLink.maxParticipants} participants
              </Text>
            )}
            
            {meetingLink.isRecurring && meetingLink.recurrencePattern && (
              <Text style={styles.recurrenceInfo}>
                Récurrence: {meetingLink.recurrencePattern}
              </Text>
            )}

            {meetingLink.tags && meetingLink.tags.length > 0 && (
              <View style={styles.tagsContainer}>
                <Text style={styles.tagsLabel}>Tags:</Text>
                <View style={styles.tagsRow}>
                  {meetingLink.tags.map((tag, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>

          {/* Notes de la réunion */}
          {meetingLink.notes && (
            <View style={styles.notesSection}>
              <Text style={styles.notesTitle}>Notes:</Text>
              <Text style={styles.notesText}>{meetingLink.notes}</Text>
            </View>
          )}

          {/* Informations de connexion */}
          <View style={styles.connectionDetails}>
            <Text style={styles.connectionTitle}>Informations de connexion:</Text>
            
            <View style={styles.connectionItem}>
              <Text style={styles.connectionLabel}>Plateforme:</Text>
              <Text style={styles.connectionValue}>{platformName}</Text>
            </View>

            <View style={styles.connectionItem}>
              <Text style={styles.connectionLabel}>Lien de réunion:</Text>
              {canJoin ? (
                <Text style={styles.connectionLink} numberOfLines={2}>
                  {MeetingLinkService.formatLinkForDisplay(meetingLink.link, 40)}
                </Text>
              ) : (
                <GlassmorphicContainer
                  intensity={15}
                  style={styles.linkVeil}
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
                    accessibilityLabel="Révéler le lien"
                    accessibilityHint="Appuyez pour saisir le mot de passe"
                    style={styles.veilTouchable}
                  >
                    <Text style={styles.veilText}>Cliquez pour révéler</Text>
                  </TouchableOpacity>
                </GlassmorphicContainer>
              )}
            </View>

            {/* Mot de passe pour liens privés */}
            {isPrivate && meetingLink.password && (
              <View style={styles.connectionItem}>
                <Text style={styles.connectionLabel}>Mot de passe:</Text>
                {isUnlocked ? (
                  <Text style={styles.connectionValue}>{meetingLink.password}</Text>
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
                      accessibilityHint="Appuyez pour saisir le mot de passe d'accès"
                      style={styles.veilTouchable}
                    >
                      <Text style={styles.veilText}>Cliquez pour révéler</Text>
                    </TouchableOpacity>
                  </GlassmorphicContainer>
                )}
              </View>
            )}
          </View>

          {/* Bouton de participation */}
          <Button
            title={
              canJoin 
                ? `Rejoindre sur ${platformName}`
                : 'Déverrouillez d\'abord'
            }
            onPress={handleJoinPress}
            disabled={!canJoin}
            variant={isPrivate ? 'primary' : 'secondary'}
            icon={<Video size={20} color="#FFFFFF" />}
            accessibilityLabel={`Rejoindre la réunion ${meetingLink.title}`}
            accessibilityHint={
              canJoin 
                ? `Ouvre ${platformName} pour rejoindre la réunion`
                : 'Vous devez d\'abord déverrouiller ce lien privé'
            }
          />
        </View>
      )}
    </GlassmorphicContainer>
  );
};

const styles = StyleSheet.create({
  meetingCard: {
    marginBottom: 16,
    borderLeftWidth: 4,
  },
  meetingCardActive: {
    borderColor: '#48BB78',
    borderWidth: 2,
  },
  meetingHeader: {
    padding: 16,
  },
  meetingInfo: {
    flex: 1,
  },
  meetingTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  meetingTitle: {
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
  platformIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  organizerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  organizerName: {
    fontSize: 14,
    color: '#718096',
    fontStyle: 'italic',
    flex: 1,
  },
  platformName: {
    fontSize: 12,
    color: '#4299E1',
    fontWeight: '500',
  },
  meetingDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 8,
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
  statusContainer: {
    alignItems: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusActive: {
    backgroundColor: '#48BB78',
    color: '#FFFFFF',
  },
  statusUpcoming: {
    backgroundColor: '#E2E8F0',
    color: '#4A5568',
  },
  meetingExpanded: {
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    padding: 16,
  },
  meetingInfoDetailed: {
    marginBottom: 16,
  },
  participantsInfo: {
    fontSize: 14,
    color: '#4A5568',
    fontWeight: '500',
    marginBottom: 4,
  },
  recurrenceInfo: {
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 8,
  },
  tagsContainer: {
    marginTop: 8,
  },
  tagsLabel: {
    fontSize: 14,
    color: '#4A5568',
    fontWeight: '500',
    marginBottom: 4,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#4A5568',
  },
  notesSection: {
    marginBottom: 16,
  },
  notesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 8,
  },
  notesText: {
    fontSize: 14,
    color: '#4A5568',
    lineHeight: 20,
    backgroundColor: 'rgba(247, 250, 252, 0.9)',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.6)',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  connectionLabel: {
    fontSize: 14,
    color: '#4A5568',
    fontWeight: '500',
    flex: 1,
  },
  connectionValue: {
    fontSize: 14,
    color: '#2D3748',
    fontFamily: 'monospace',
    backgroundColor: 'rgba(247, 250, 252, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    flex: 2,
    textAlign: 'right',
  },
  connectionLink: {
    fontSize: 14,
    color: '#4299E1',
    textDecorationLine: 'underline',
    flex: 2,
    textAlign: 'right',
  },
  linkVeil: {
    backgroundColor: 'rgba(247, 250, 252, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.6)',
    borderStyle: 'dashed',
    alignItems: 'center',
  },
  passwordVeil: {
    borderRadius: 8,
  },
  veilTouchable: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
  },
});