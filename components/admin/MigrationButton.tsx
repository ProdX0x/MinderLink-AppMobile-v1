/**
 * Composant MigrationButton
 * Bouton pour migrer les données depuis les fichiers statiques vers Supabase
 * À utiliser une seule fois lors de la première utilisation
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Database, Upload } from 'lucide-react-native';
import { SupabaseMeetingService } from '@/services/supabaseMeetingService';
import { meetingLinks } from '@/data/meetingLinks';
import { publicSessions, vipSessions } from '@/data/sessions';

export const MigrationButton: React.FC = () => {
  const [isMigrating, setIsMigrating] = useState(false);
  const [migrationStatus, setMigrationStatus] = useState<string | null>(null);

  const handleMigration = async () => {
    Alert.alert(
      'Migration des données',
      'Êtes-vous sûr de vouloir migrer toutes les données vers Supabase ? Cette opération peut prendre quelques secondes.',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Migrer',
          onPress: async () => {
            try {
              setIsMigrating(true);
              setMigrationStatus('Migration en cours...');

              let successCount = 0;
              let errorCount = 0;

              // Migration des MeetingLinks
              setMigrationStatus('Migration des réunions...');
              for (const meetingLink of meetingLinks) {
                try {
                  const input = SupabaseMeetingService.fromMeetingLink(meetingLink);
                  await SupabaseMeetingService.createMeeting({
                    ...input,
                    created_by: 'migration_button',
                  });
                  successCount++;
                } catch (error) {
                  console.error(`Erreur pour "${meetingLink.title}":`, error);
                  errorCount++;
                }
              }

              // Migration des Public Sessions
              setMigrationStatus('Migration des sessions publiques...');
              for (const session of publicSessions) {
                try {
                  const input = SupabaseMeetingService.fromSession(session);
                  await SupabaseMeetingService.createMeeting({
                    ...input,
                    created_by: 'migration_button',
                  });
                  successCount++;
                } catch (error) {
                  console.error(`Erreur pour "${session.region}":`, error);
                  errorCount++;
                }
              }

              // Migration des VIP Sessions
              setMigrationStatus('Migration des sessions VIP...');
              for (const session of vipSessions) {
                try {
                  const input = SupabaseMeetingService.fromSession(session);
                  await SupabaseMeetingService.createMeeting({
                    ...input,
                    created_by: 'migration_button',
                  });
                  successCount++;
                } catch (error) {
                  console.error(`Erreur pour "${session.region}":`, error);
                  errorCount++;
                }
              }

              setMigrationStatus(null);
              setIsMigrating(false);

              Alert.alert(
                'Migration terminée',
                `Succès: ${successCount}\nErreurs: ${errorCount}`,
                [{ text: 'OK' }]
              );
            } catch (error) {
              setIsMigrating(false);
              setMigrationStatus(null);
              Alert.alert('Erreur', 'La migration a échoué. Vérifiez votre connexion.');
              console.error('Erreur de migration:', error);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isMigrating && styles.buttonDisabled]}
        onPress={handleMigration}
        disabled={isMigrating}
      >
        {isMigrating ? (
          <>
            <ActivityIndicator size="small" color="#FFFFFF" />
            <Text style={styles.buttonText}>Migration en cours...</Text>
          </>
        ) : (
          <>
            <Upload size={20} color="#FFFFFF" />
            <Text style={styles.buttonText}>Migrer les données vers Supabase</Text>
          </>
        )}
      </TouchableOpacity>

      {migrationStatus && (
        <View style={styles.statusContainer}>
          <Database size={16} color="#4299E1" />
          <Text style={styles.statusText}>{migrationStatus}</Text>
        </View>
      )}

      <Text style={styles.warningText}>
        ⚠️ À utiliser une seule fois lors de la première utilisation
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4299E1',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    gap: 8,
  },
  buttonDisabled: {
    backgroundColor: '#A0AEC0',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    gap: 8,
  },
  statusText: {
    color: '#4299E1',
    fontSize: 14,
    fontWeight: '500',
  },
  warningText: {
    color: '#E53E3E',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 12,
    fontStyle: 'italic',
  },
});
