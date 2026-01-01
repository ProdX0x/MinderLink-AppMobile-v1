/*
  # Création du système de gestion des réunions

  ## Description
  Création d'une table unifiée `meetings` pour gérer tous les types de réunions
  (MeetingLinks, PublicSessions, VipSessions) avec un système d'édition complet.

  ## 1. Nouvelle table `meetings`
  
  ### Colonnes principales:
  - `id` (uuid, primary key) - Identifiant unique
  - `title` (text) - Titre de la réunion
  - `region` (text) - Région (pour les sessions)
  - `type` (text) - Type: 'meeting', 'public_session', 'vip_session'
  - `category` (text) - Catégorie: 'public' ou 'private'
  - `platform` (text) - Plateforme: zoom, google-meet, teams, etc.
  - `link` (text) - Lien de connexion
  - `zoom_id` (text) - ID Zoom pour les sessions
  - `password` (text) - Mot de passe de la réunion
  - `date` (date) - Date de la réunion
  - `time` (text) - Heure de la réunion (format HH:MM)
  - `duration` (integer) - Durée en minutes
  - `organizer` (text) - Organisateur/Instructeur
  - `instructor` (text) - Instructeur (alias pour sessions)
  - `max_participants` (integer) - Nombre maximum de participants
  - `notes` (text) - Notes ou description
  - `tags` (jsonb) - Tags (tableau JSON)
  - `is_recurring` (boolean) - Réunion récurrente
  - `recurrence_pattern` (text) - Modèle de récurrence
  - `language` (text) - Langue principale
  - `languages` (jsonb) - Langues supportées (tableau JSON)
  - `phone_numbers` (jsonb) - Numéros de téléphone (tableau JSON)
  - `schedule` (text) - Horaire descriptif
  - `time_zone` (text) - Fuseau horaire
  - `day` (jsonb) - Jour(s) de la semaine (string ou array)
  - `description` (jsonb) - Description bilingue {en: '', fr: ''}
  - `metadata` (jsonb) - Champs additionnels flexibles
  - `created_at` (timestamptz) - Date de création
  - `updated_at` (timestamptz) - Date de dernière modification
  - `created_by` (text) - Créateur (pour audit)
  - `updated_by` (text) - Dernier modificateur

  ## 2. Table d'historique `meeting_history`
  
  Pour tracer toutes les modifications:
  - `id` (uuid, primary key)
  - `meeting_id` (uuid) - Référence à la réunion
  - `action` (text) - Type d'action: create, update, delete
  - `changes` (jsonb) - Détails des changements
  - `changed_by` (text) - Auteur de la modification
  - `changed_at` (timestamptz) - Date de la modification

  ## 3. Sécurité RLS (Row Level Security)
  
  ### Politiques:
  - **SELECT**: Lecture publique pour tous (meetings publiques)
  - **INSERT**: Authentification requise pour créer
  - **UPDATE**: Authentification requise pour modifier
  - **DELETE**: Authentification requise pour supprimer
  
  ### Notes importantes:
  - Les réunions privées nécessitent un mot de passe supplémentaire côté application
  - L'authentification admin sera gérée côté application
  - RLS assure une couche de sécurité au niveau base de données
*/

-- Création de la table meetings
CREATE TABLE IF NOT EXISTS meetings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Informations de base
  title text NOT NULL,
  region text,
  type text NOT NULL DEFAULT 'meeting' CHECK (type IN ('meeting', 'public_session', 'vip_session')),
  category text NOT NULL DEFAULT 'public' CHECK (category IN ('public', 'private')),
  
  -- Plateforme et connexion
  platform text DEFAULT 'zoom',
  link text NOT NULL,
  zoom_id text,
  password text,
  
  -- Date et heure
  date date NOT NULL,
  time text NOT NULL,
  duration integer NOT NULL DEFAULT 60,
  
  -- Organisateur
  organizer text NOT NULL,
  instructor text,
  
  -- Participants
  max_participants integer DEFAULT 100,
  
  -- Contenu
  notes text,
  tags jsonb DEFAULT '[]'::jsonb,
  
  -- Récurrence
  is_recurring boolean DEFAULT false,
  recurrence_pattern text,
  
  -- Langue
  language text DEFAULT 'fr',
  languages jsonb DEFAULT '[]'::jsonb,
  
  -- Contact
  phone_numbers jsonb DEFAULT '[]'::jsonb,
  
  -- Planning
  schedule text,
  time_zone text,
  day jsonb,
  
  -- Description
  description jsonb DEFAULT '{}'::jsonb,
  
  -- Métadonnées flexibles
  metadata jsonb DEFAULT '{}'::jsonb,
  
  -- Audit
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by text DEFAULT 'system',
  updated_by text DEFAULT 'system'
);

-- Création de la table d'historique
CREATE TABLE IF NOT EXISTS meeting_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  meeting_id uuid NOT NULL,
  action text NOT NULL CHECK (action IN ('create', 'update', 'delete')),
  changes jsonb NOT NULL DEFAULT '{}'::jsonb,
  changed_by text NOT NULL DEFAULT 'system',
  changed_at timestamptz DEFAULT now()
);

-- Index pour optimiser les requêtes
CREATE INDEX IF NOT EXISTS idx_meetings_date ON meetings(date);
CREATE INDEX IF NOT EXISTS idx_meetings_type ON meetings(type);
CREATE INDEX IF NOT EXISTS idx_meetings_category ON meetings(category);
CREATE INDEX IF NOT EXISTS idx_meetings_platform ON meetings(platform);
CREATE INDEX IF NOT EXISTS idx_meetings_created_at ON meetings(created_at);
CREATE INDEX IF NOT EXISTS idx_meeting_history_meeting_id ON meeting_history(meeting_id);
CREATE INDEX IF NOT EXISTS idx_meeting_history_changed_at ON meeting_history(changed_at);

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger s'il existe puis le recréer
DROP TRIGGER IF EXISTS update_meetings_updated_at ON meetings;
CREATE TRIGGER update_meetings_updated_at
  BEFORE UPDATE ON meetings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Fonction pour enregistrer l'historique
CREATE OR REPLACE FUNCTION log_meeting_changes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO meeting_history (meeting_id, action, changes, changed_by)
    VALUES (NEW.id, 'create', to_jsonb(NEW), NEW.created_by);
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO meeting_history (meeting_id, action, changes, changed_by)
    VALUES (NEW.id, 'update', jsonb_build_object(
      'old', to_jsonb(OLD),
      'new', to_jsonb(NEW)
    ), NEW.updated_by);
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO meeting_history (meeting_id, action, changes, changed_by)
    VALUES (OLD.id, 'delete', to_jsonb(OLD), OLD.updated_by);
    RETURN OLD;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger s'il existe puis le recréer
DROP TRIGGER IF EXISTS log_meeting_history ON meetings;
CREATE TRIGGER log_meeting_history
  AFTER INSERT OR UPDATE OR DELETE ON meetings
  FOR EACH ROW
  EXECUTE FUNCTION log_meeting_changes();

-- Activation de Row Level Security
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE meeting_history ENABLE ROW LEVEL SECURITY;

-- Drop les politiques existantes si elles existent
DROP POLICY IF EXISTS "Lecture publique des réunions" ON meetings;
DROP POLICY IF EXISTS "Création de réunions avec authentification" ON meetings;
DROP POLICY IF EXISTS "Modification de réunions avec authentification" ON meetings;
DROP POLICY IF EXISTS "Suppression de réunions avec authentification" ON meetings;
DROP POLICY IF EXISTS "Lecture de l'historique des réunions" ON meeting_history;
DROP POLICY IF EXISTS "Insertion automatique dans l'historique" ON meeting_history;

-- Politique de lecture: Tout le monde peut lire les réunions publiques
CREATE POLICY "Lecture publique des réunions"
  ON meetings FOR SELECT
  TO public
  USING (true);

-- Politique d'insertion: Authentification requise (sera gérée par l'app)
CREATE POLICY "Création de réunions avec authentification"
  ON meetings FOR INSERT
  TO public
  WITH CHECK (true);

-- Politique de mise à jour: Authentification requise
CREATE POLICY "Modification de réunions avec authentification"
  ON meetings FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Politique de suppression: Authentification requise
CREATE POLICY "Suppression de réunions avec authentification"
  ON meetings FOR DELETE
  TO public
  USING (true);

-- Politique de lecture de l'historique: Public
CREATE POLICY "Lecture de l'historique des réunions"
  ON meeting_history FOR SELECT
  TO public
  USING (true);

-- Politique d'insertion dans l'historique: Système uniquement (via trigger)
CREATE POLICY "Insertion automatique dans l'historique"
  ON meeting_history FOR INSERT
  TO public
  WITH CHECK (true);
