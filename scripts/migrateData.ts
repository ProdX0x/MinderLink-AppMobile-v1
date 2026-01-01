/**
 * Script de migration des données vers Supabase
 * Importe les MeetingLinks et Sessions existants dans la base de données
 */

import { SupabaseMeetingService } from '../services/supabaseMeetingService';
import { meetingLinks } from '../data/meetingLinks';
import { publicSessions, vipSessions } from '../data/sessions';

export async function migrateAllData() {
  console.log('🚀 Début de la migration des données vers Supabase...\n');

  let successCount = 0;
  let errorCount = 0;

  try {
    // Migration des MeetingLinks
    console.log('📋 Migration des Meeting Links...');
    for (const meetingLink of meetingLinks) {
      try {
        const input = SupabaseMeetingService.fromMeetingLink(meetingLink);
        await SupabaseMeetingService.createMeeting({
          ...input,
          created_by: 'migration_script',
        });
        console.log(`  ✅ ${meetingLink.title}`);
        successCount++;
      } catch (error) {
        console.error(`  ❌ Erreur pour "${meetingLink.title}":`, error);
        errorCount++;
      }
    }

    // Migration des Public Sessions
    console.log('\n📋 Migration des Sessions Publiques...');
    for (const session of publicSessions) {
      try {
        const input = SupabaseMeetingService.fromSession(session);
        await SupabaseMeetingService.createMeeting({
          ...input,
          created_by: 'migration_script',
        });
        console.log(`  ✅ ${session.region}`);
        successCount++;
      } catch (error) {
        console.error(`  ❌ Erreur pour "${session.region}":`, error);
        errorCount++;
      }
    }

    // Migration des VIP Sessions
    console.log('\n📋 Migration des Sessions VIP...');
    for (const session of vipSessions) {
      try {
        const input = SupabaseMeetingService.fromSession(session);
        await SupabaseMeetingService.createMeeting({
          ...input,
          created_by: 'migration_script',
        });
        console.log(`  ✅ ${session.region}`);
        successCount++;
      } catch (error) {
        console.error(`  ❌ Erreur pour "${session.region}":`, error);
        errorCount++;
      }
    }

    console.log('\n✨ Migration terminée!');
    console.log(`✅ Succès: ${successCount}`);
    console.log(`❌ Erreurs: ${errorCount}`);

    return { successCount, errorCount };
  } catch (error) {
    console.error('\n❌ Erreur fatale lors de la migration:', error);
    throw error;
  }
}

// Fonction pour nettoyer la base de données (utile pour les tests)
export async function clearDatabase() {
  console.log('🧹 Nettoyage de la base de données...');

  try {
    const meetings = await SupabaseMeetingService.getAllMeetings();

    for (const meeting of meetings) {
      try {
        await SupabaseMeetingService.deleteMeeting(meeting.id);
        console.log(`  ✅ Supprimé: ${meeting.title}`);
      } catch (error) {
        console.error(`  ❌ Erreur lors de la suppression de "${meeting.title}":`, error);
      }
    }

    console.log('✨ Nettoyage terminé!');
  } catch (error) {
    console.error('❌ Erreur lors du nettoyage:', error);
    throw error;
  }
}

// Si ce script est exécuté directement
if (require.main === module) {
  migrateAllData()
    .then(({ successCount, errorCount }) => {
      if (errorCount === 0) {
        console.log('\n🎉 Migration réussie sans erreur!');
        process.exit(0);
      } else {
        console.log('\n⚠️  Migration terminée avec des erreurs.');
        process.exit(1);
      }
    })
    .catch((error) => {
      console.error('\n💥 Migration échouée:', error);
      process.exit(1);
    });
}
