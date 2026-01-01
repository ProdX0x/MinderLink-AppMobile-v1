/**
 * Composant EditMeetingModal
 * Modal réutilisable pour éditer toutes les réunions (MeetingLink et Session)
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { X, Save, Calendar as CalendarIcon, Clock } from 'lucide-react-native';
import { Button } from './Button';
import type { MeetingLink, Session, UpdateMeetingInput } from '@/types';

interface EditMeetingModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: UpdateMeetingInput) => Promise<void>;
  meeting?: MeetingLink | Session;
  type: 'meeting' | 'session';
}

export const EditMeetingModal: React.FC<EditMeetingModalProps> = ({
  visible,
  onClose,
  onSave,
  meeting,
  type,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  // État du formulaire
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [link, setLink] = useState('');
  const [zoomId, setZoomId] = useState('');
  const [password, setPassword] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('');
  const [notes, setNotes] = useState('');
  const [platform, setPlatform] = useState('zoom');

  // Plateformes disponibles
  const platforms = [
    { id: 'zoom', label: 'Zoom' },
    { id: 'google-meet', label: 'Google Meet' },
    { id: 'teams', label: 'Teams' },
    { id: 'webex', label: 'Webex' },
    { id: 'other', label: 'Autre' },
  ];

  // Initialiser le formulaire avec les données de la réunion
  useEffect(() => {
    if (meeting && type === 'meeting') {
      const m = meeting as MeetingLink;
      setTitle(m.title);
      setDate(m.date);
      setTime(m.time);
      setDuration(m.duration.toString());
      setOrganizer(m.organizer);
      setLink(m.link);
      setPassword(m.password || '');
      setMaxParticipants(m.maxParticipants?.toString() || '');
      setNotes(m.notes || '');
      setPlatform(m.platform);
    } else if (meeting && type === 'session') {
      const s = meeting as Session;
      setTitle(s.region);
      setDate(s.date);
      setTime(s.time);
      setDuration(s.duration.toString());
      setOrganizer(s.instructor);
      setZoomId(s.zoomId);
      setMaxParticipants(s.maxParticipants.toString());

      if (s.type === 'public') {
        setLink(s.zoomLink);
      } else {
        setPassword(s.password);
      }
    }
  }, [meeting, type]);

  const handleSave = async () => {
    // Validation
    if (!title.trim()) {
      Alert.alert('Erreur', 'Le titre est requis');
      return;
    }
    if (!date.trim()) {
      Alert.alert('Erreur', 'La date est requise');
      return;
    }
    if (!time.trim()) {
      Alert.alert('Erreur', 'L\'heure est requise');
      return;
    }
    if (!duration.trim() || isNaN(parseInt(duration))) {
      Alert.alert('Erreur', 'La durée doit être un nombre valide');
      return;
    }
    if (!organizer.trim()) {
      Alert.alert('Erreur', 'L\'organisateur est requis');
      return;
    }
    if (!link.trim() && !zoomId.trim()) {
      Alert.alert('Erreur', 'Le lien ou l\'ID Zoom est requis');
      return;
    }

    try {
      setIsLoading(true);

      const updateData: UpdateMeetingInput = {
        id: meeting!.id,
        title: title.trim(),
        date: date.trim(),
        time: time.trim(),
        duration: parseInt(duration),
        organizer: organizer.trim(),
        updated_by: 'admin',
      };

      if (type === 'meeting') {
        updateData.link = link.trim();
        updateData.platform = platform;
        if (password.trim()) {
          updateData.password = password.trim();
        }
        if (notes.trim()) {
          updateData.notes = notes.trim();
        }
      } else {
        updateData.zoom_id = zoomId.trim();
        updateData.link = link.trim() || `https://zoom.us/j/${zoomId.trim().replace(/\s/g, '')}`;
        updateData.instructor = organizer.trim();
        if (password.trim()) {
          updateData.password = password.trim();
        }
      }

      if (maxParticipants.trim() && !isNaN(parseInt(maxParticipants))) {
        updateData.max_participants = parseInt(maxParticipants);
      }

      await onSave(updateData);

      Alert.alert('Succès', 'Les modifications ont été enregistrées', [
        { text: 'OK', onPress: onClose },
      ]);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      Alert.alert('Erreur', 'Impossible d\'enregistrer les modifications');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    Alert.alert('Annuler les modifications', 'Êtes-vous sûr de vouloir annuler ?', [
      { text: 'Non', style: 'cancel' },
      { text: 'Oui', onPress: onClose, style: 'destructive' },
    ]);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {meeting ? 'Modifier la réunion' : 'Nouvelle réunion'}
            </Text>
            <TouchableOpacity onPress={handleCancel} style={styles.closeButton}>
              <X size={24} color="#4A5568" />
            </TouchableOpacity>
          </View>

          {/* Formulaire */}
          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            {/* Titre */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>
                {type === 'meeting' ? 'Titre' : 'Région'} *
              </Text>
              <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder={type === 'meeting' ? 'Titre de la réunion' : 'Région'}
                placeholderTextColor="#A0AEC0"
              />
            </View>

            {/* Date et Heure */}
            <View style={styles.formRow}>
              <View style={[styles.formGroup, styles.formGroupHalf]}>
                <Text style={styles.label}>Date *</Text>
                <View style={styles.inputWithIcon}>
                  <CalendarIcon size={20} color="#718096" style={styles.inputIcon} />
                  <TextInput
                    style={styles.inputWithIconText}
                    value={date}
                    onChangeText={setDate}
                    placeholder="YYYY-MM-DD"
                    placeholderTextColor="#A0AEC0"
                  />
                </View>
              </View>

              <View style={[styles.formGroup, styles.formGroupHalf]}>
                <Text style={styles.label}>Heure *</Text>
                <View style={styles.inputWithIcon}>
                  <Clock size={20} color="#718096" style={styles.inputIcon} />
                  <TextInput
                    style={styles.inputWithIconText}
                    value={time}
                    onChangeText={setTime}
                    placeholder="HH:MM"
                    placeholderTextColor="#A0AEC0"
                  />
                </View>
              </View>
            </View>

            {/* Durée et Participants */}
            <View style={styles.formRow}>
              <View style={[styles.formGroup, styles.formGroupHalf]}>
                <Text style={styles.label}>Durée (min) *</Text>
                <TextInput
                  style={styles.input}
                  value={duration}
                  onChangeText={setDuration}
                  placeholder="60"
                  keyboardType="numeric"
                  placeholderTextColor="#A0AEC0"
                />
              </View>

              <View style={[styles.formGroup, styles.formGroupHalf]}>
                <Text style={styles.label}>Max participants</Text>
                <TextInput
                  style={styles.input}
                  value={maxParticipants}
                  onChangeText={setMaxParticipants}
                  placeholder="100"
                  keyboardType="numeric"
                  placeholderTextColor="#A0AEC0"
                />
              </View>
            </View>

            {/* Organisateur/Instructeur */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>
                {type === 'meeting' ? 'Organisateur' : 'Instructeur'} *
              </Text>
              <TextInput
                style={styles.input}
                value={organizer}
                onChangeText={setOrganizer}
                placeholder={
                  type === 'meeting' ? 'Nom de l\'organisateur' : 'Nom de l\'instructeur'
                }
                placeholderTextColor="#A0AEC0"
              />
            </View>

            {/* Plateforme (pour meetings uniquement) */}
            {type === 'meeting' && (
              <View style={styles.formGroup}>
                <Text style={styles.label}>Plateforme</Text>
                <View style={styles.platformSelector}>
                  {platforms.map((p) => (
                    <TouchableOpacity
                      key={p.id}
                      style={[
                        styles.platformButton,
                        platform === p.id && styles.platformButtonActive,
                      ]}
                      onPress={() => setPlatform(p.id)}
                    >
                      <Text
                        style={[
                          styles.platformButtonText,
                          platform === p.id && styles.platformButtonTextActive,
                        ]}
                      >
                        {p.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* Lien */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>
                {type === 'meeting' ? 'Lien de réunion *' : 'Lien Zoom'}
              </Text>
              <TextInput
                style={styles.input}
                value={link}
                onChangeText={setLink}
                placeholder="https://..."
                placeholderTextColor="#A0AEC0"
                autoCapitalize="none"
              />
            </View>

            {/* Zoom ID (pour sessions uniquement) */}
            {type === 'session' && (
              <View style={styles.formGroup}>
                <Text style={styles.label}>ID Zoom *</Text>
                <TextInput
                  style={styles.input}
                  value={zoomId}
                  onChangeText={setZoomId}
                  placeholder="123 456 7890"
                  placeholderTextColor="#A0AEC0"
                />
              </View>
            )}

            {/* Mot de passe */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Mot de passe</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Optionnel"
                placeholderTextColor="#A0AEC0"
                secureTextEntry={false}
              />
            </View>

            {/* Notes (pour meetings uniquement) */}
            {type === 'meeting' && (
              <View style={styles.formGroup}>
                <Text style={styles.label}>Notes</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={notes}
                  onChangeText={setNotes}
                  placeholder="Notes additionnelles..."
                  placeholderTextColor="#A0AEC0"
                  multiline
                  numberOfLines={4}
                />
              </View>
            )}
          </ScrollView>

          {/* Footer avec boutons d'action */}
          <View style={styles.modalFooter}>
            <Button
              title="Annuler"
              onPress={handleCancel}
              variant="outline"
              style={styles.footerButton}
              disabled={isLoading}
            />
            <Button
              title={isLoading ? 'Enregistrement...' : 'Enregistrer'}
              onPress={handleSave}
              variant="primary"
              icon={<Save size={20} color="#FFFFFF" />}
              style={styles.footerButton}
              disabled={isLoading}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '90%',
    maxWidth: 600,
    maxHeight: '85%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D3748',
  },
  closeButton: {
    padding: 4,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formGroupHalf: {
    width: '48%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A5568',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#2D3748',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingLeft: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  inputWithIconText: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 12,
    fontSize: 16,
    color: '#2D3748',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  platformSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  platformButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#E2E8F0',
    marginBottom: 8,
  },
  platformButtonActive: {
    backgroundColor: '#4299E1',
  },
  platformButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A5568',
  },
  platformButtonTextActive: {
    color: '#FFFFFF',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    gap: 12,
  },
  footerButton: {
    flex: 1,
  },
});
