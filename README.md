# MinderLink - Gestionnaire de Liens de Réunion

<div align="center">
  <img src="./assets/images/Logo4peace.png" alt="MinderLink Logo" width="120" height="120">
  
  **Une application mobile moderne pour gérer vos liens de réunion**
  
  [![React Native](https://img.shields.io/badge/React%20Native-0.79.1-blue.svg)](https://reactnative.dev/)
  [![Expo](https://img.shields.io/badge/Expo-53.0.0-black.svg)](https://expo.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
  [![iOS](https://img.shields.io/badge/iOS-26.0+-lightgrey.svg)](https://developer.apple.com/ios/)
  [![Android](https://img.shields.io/badge/Android-6.0+-green.svg)](https://developer.android.com/)
  [![Web](https://img.shields.io/badge/Web-Compatible-orange.svg)](https://expo.dev/web)
</div>

## Table des Matières
*   [À propos du Projet](#à-propos-du-projet)
*   [Fonctionnalités](#fonctionnalités)
*   [Design Glassmorphique](#design-glassmorphique)
*   [Technologies Utilisées](#technologies-utilisées)
*   [Architecture](#architecture)
*   [Installation](#installation)
*   [Utilisation](#utilisation)
*   [Structure du Projet](#structure-du-projet)
*   [Gestion des Données](#gestion-des-données)
*   [Architecture des Écrans](#architecture-des-écrans)
*   [Personnalisation](#personnalisation)
*   [Développement](#développement)
*   [Déploiement](#déploiement)
*   [Contribution](#contribution)
*   [Licence](#licence)

## À propos du Projet

**MinderLink** est une application mobile cross-platform développée avec Expo et React Native, conçue pour simplifier la gestion et l'accès à vos liens de réunion. L'application offre une interface utilisateur intuitive pour organiser, filtrer et rejoindre facilement vos réunions sur différentes plateformes (Zoom, Google Meet, Teams, etc.).

<p align="center">
<img src="https://via.placeholder.com/150x300/4DCDCD/FFFFFF?text=Accueil" alt="Écran d'accueil" width="150"/>
<img src="https://via.placeholder.com/150x300/48BB78/FFFFFF?text=Liens+Publics" alt="Liens publics" width="150"/>
<img src="https://via.placeholder.com/150x300/F4A460/FFFFFF?text=Liens+Privés" alt="Liens privés" width="150"/>
<img src="https://via.placeholder.com/150x300/4299E1/FFFFFF?text=Réglages" alt="Réglages" width="150"/>
</p>

## Fonctionnalités

### 🔗 Gestion des Liens
*   **Liens Publics :** Accès libre aux réunions ouvertes à tous
*   **Liens Privés :** Réunions sécurisées avec authentification par mot de passe
*   **Support Multi-Plateformes :** Zoom, Google Meet, Microsoft Teams, Cisco Webex
*   **Informations Détaillées :** Organisateur, durée, participants max, notes

### 🎯 Filtrage et Organisation
*   **Filtres par Jour :** Filtrage par jour de la semaine
*   **Filtres par Plateforme :** Organisation par type de plateforme
*   **Réunions du Jour :** Vue dédiée aux réunions d'aujourd'hui
*   **Recherche Intelligente :** Filtrage combiné pour trouver rapidement

### 🔐 Sécurité et Authentification
*   **Authentification VIP :** Système de mot de passe pour les liens privés
*   **Déverrouillage Progressif :** Révélation sécurisée des informations sensibles
*   **Gestion des Sessions :** Maintien de l'état d'authentification

### 🎨 Interface Utilisateur
*   **Design Responsive :** Adaptation automatique à toutes les tailles d'écran
*   **Animations Fluides :** Transitions et micro-interactions soignées
*   **Thème Cohérent :** Palette de couleurs harmonieuse avec dégradés
*   **Accessibilité :** Support complet des technologies d'assistance

### 🌐 Fonctionnalités Sociales
*   **Intégration Réseaux Sociaux :** Liens vers Facebook, YouTube, X (Twitter)
*   **Partage Facile :** Bouton d'action flottant avec animations

### ⚙️ Configuration et Personnalisation
*   **Sélection de Langue :** Interface multilingue (FR, EN, IT, JP, ES, DE)
*   **Réglages Système :** Notifications, préférences utilisateur
*   **Thème Adaptatif :** Interface qui s'adapte aux préférences système

## Design Glassmorphique

MinderLink intègre un design glassmorphique moderne, offrant une interface utilisateur élégante et immersive. Cette approche visuelle est appliquée de manière cohérente à travers l'application, en respectant scrupuleusement la palette de couleurs existante pour une harmonie visuelle parfaite.

*   **Effets de Flou et Transparence**: Les éléments clés de l'interface, tels que les cartes de réunion, les en-têtes et les boutons, bénéficient d'un arrière-plan flou grâce à `expo-blur`. Des couches translucides, créées avec `expo-linear-gradient`, permettent de révéler subtilement le fond tout en assurant la lisibilité du contenu.
*   **Palette de Couleurs Préservée**: Le glassmorphisme est intégré en ajustant les opacités et les saturations des couleurs existantes (turquoise, orange, vert, blanc) pour créer des effets de profondeur sans introduire de nouvelles teintes. Cela garantit une cohérence visuelle forte avec l'identité de MinderLink.
*   **Reflets et Bordures Subtils**: Des dégradés très légers simulent des reflets de lumière sur les surfaces glassmorphiques, ajoutant une touche de réalisme et de sophistication. Des bordures fines et semi-transparentes définissent les contours des éléments, renforçant l'effet de "verre dépoli".
*   **Animations Fluides et Performantes**: `react-native-reanimated` est utilisé pour animer les transitions et les interactions avec les éléments glassmorphiques, offrant une expérience utilisateur dynamique et réactive sans compromettre les performances.
*   **Lisibilité et Accessibilité**: Une attention particulière est portée au contraste pour garantir que le texte et les icônes restent parfaitement lisibles sur les fonds translucides, assurant ainsi une expérience accessible pour tous les utilisateurs.

## Technologies Utilisées

### Framework Principal
*   **React Native 0.79.1** - Framework de développement mobile cross-platform
*   **Expo 53.0.0** - Plateforme de développement et déploiement
*   **Expo Router 5.0.2** - Système de navigation basé sur les fichiers
*   **TypeScript 5.8.3** - Typage statique pour JavaScript

### Interface Utilisateur
*   **Lucide React Native** - Bibliothèque d'icônes modernes et personnalisables
*   **Expo Linear Gradient** - Dégradés et effets visuels avancés
*   **Expo Blur** - Effets de flou d'arrière-plan pour le glassmorphisme
*   **React Native Reanimated 3.17.4** - Animations haute performance
*   **React Native Gesture Handler 2.24.0** - Gestion avancée des gestes

### Gestion d'État et Données
*   **React Context API** - Gestion d'état global (langue, authentification)
*   **AsyncStorage** - Stockage local persistant
*   **Custom Hooks** - Logique métier réutilisable

### Développement et Outils
*   **Expo Dev Client** - Environnement de développement
*   **Metro Bundler** - Bundler JavaScript optimisé
*   **Babel** - Transpilation JavaScript moderne

## Architecture

### Pattern MVVM (Model-View-ViewModel)
L'application suit le pattern MVVM pour une séparation claire des responsabilités :

*   **Model** : Données et logique métier (`/data`, `/types`)
*   **View** : Composants d'interface utilisateur (`/components`)
*   **ViewModel** : Hooks personnalisés et logique de présentation (`/hooks`)

### Architecture Modulaire
*   **Composants Réutilisables** : Bibliothèque de composants UI cohérents
*   **Design System Glassmorphique**: Intégration des principes glassmorphiques à travers des composants dédiés et des styles cohérents.
*   **Services** : Couche d'abstraction pour les API externes
*   **Utilitaires** : Fonctions pures pour le traitement des données
*   **Types TypeScript** : Définitions strictes pour la sécurité des types

## Installation

### Prérequis
*   **Node.js** (version LTS recommandée)
*   **npm** ou **yarn**
*   **Expo CLI** : `npm install -g @expo/cli`
*   **Expo Go** (pour les tests sur appareil physique)

### Installation des Dépendances
```bash
# Cloner le repository
git clone <repository_url>
cd minderlink

# Installer les dépendances
npm install
# ou
yarn install
```

### Configuration
```bash
# Copier le fichier d'environnement
cp .env.example .env

# Modifier les variables d'environnement si nécessaire
# (Actuellement, aucune configuration externe n'est requise)
```

## Utilisation

### Développement
```bash
# Démarrer le serveur de développement
npm run dev
# ou
yarn dev

# Pour le web spécifiquement
npm run dev -- --web
```

### Build de Production
```bash
# Build pour le web
npm run build:web
# ou
yarn build:web
```

### Tests sur Appareils
1. **Appareil Physique** : Scanner le QR code avec Expo Go
2. **Simulateur iOS** : Appuyer sur `i` dans le terminal
3. **Émulateur Android** : Appuyer sur `a` dans le terminal
4. **Navigateur Web** : Appuyer sur `w` dans le terminal

## Structure du Projet

```
├── app/                          # Écrans et navigation (Expo Router)
│   ├── (tabs)/                   # Navigation par onglets
│   │   ├── index.tsx            # Écran d'accueil principal
│   │   └── _layout.tsx          # Configuration des onglets
│   ├── index.tsx                # Écran d'introduction/splash
│   ├── language-select.tsx      # Sélection de langue
│   ├── public-links.tsx         # Liens de réunion publics
│   ├── private-links.tsx        # Liens de réunion privés
│   ├── private-auth.tsx         # Authentification privée
│   ├── settings.tsx             # Paramètres de l'application
│   ├── _layout.tsx              # Layout racine
│   └── +not-found.tsx           # Page d'erreur 404
├── components/                   # Composants réutilisables
│   ├── ui/                      # Composants d'interface de base
│   │   ├── Button.tsx           # Bouton configurable
│   │   ├── Header.tsx           # En-tête avec navigation
│   │   ├── MeetingLinkCard.tsx  # Carte de lien de réunion
│   │   ├── FilterButton.tsx     # Bouton de filtre
│   │   ├── FilterBar.tsx        # Barre de filtres
│   │   ├── EmptyState.tsx       # État vide
│   │   ├── AudioPlayer.tsx      # Lecteur audio (méditation)
│   │   ├── SocialMediaFab.tsx   # Bouton flottant réseaux sociaux
│   │   ├── GlassmorphicContainer.tsx # Conteneur glassmorphique
│   │   └── SessionCard.tsx      # Carte de session (pour VIP)
│   ├── screens/                 # Composants spécifiques aux écrans
│   │   └── MeetingLinkList.tsx  # Liste de liens avec filtres
│   └── icons/                   # Icônes personnalisées
│       └── XIcon.tsx            # Icône X (Twitter)
├── data/                        # Données et configuration
│   ├── meetingLinks.ts          # Données des liens de réunion
│   └── *.json                   # Animations Lottie
├── hooks/                       # Hooks React personnalisés
│   ├── useFrameworkReady.ts     # Initialisation du framework
│   ├── useResponsive.ts         # Gestion responsive
│   ├── useMeetingLinkFilters.ts # Filtrage des liens
│   └── usePrivateLinkAuth.ts    # Authentification privée
├── services/                    # Services et logique métier
│   └── meetingLinkService.ts    # Service de gestion des liens
├── types/                       # Définitions TypeScript
│   └── index.ts                 # Types globaux
├── utils/                       # Fonctions utilitaires
│   ├── accessibility.ts         # Helpers d'accessibilité
│   ├── responsive.ts            # Utilitaires responsive
│   └── meetingLink.ts           # Traitement des données
├── context/                     # Contextes React
│   └── LanguageContext.tsx      # Gestion de la langue
└── assets/                      # Ressources statiques
    └── images/                  # Images et logos
```

## Gestion des Données

### Structure des Données
Les liens de réunion sont typés avec TypeScript et incluent :

```typescript
interface MeetingLink {
  id: string;
  title: string;
  platform: 'zoom' | 'google-meet' | 'teams' | 'webex' | 'other';
  link: string;
  password?: string;
  category: 'public' | 'private';
  date: string;
  time: string;
  duration: number;
  organizer: string;
  maxParticipants?: number;
  tags?: string[];
  isRecurring?: boolean;
  recurrencePattern?: string;
}
```

### Source de Données
*   **Développement** : Données mockées dans `data/meetingLinks.ts`
*   **Production** : Prêt pour intégration avec API REST ou base de données
*   **Stockage Local** : AsyncStorage pour les préférences utilisateur

## Architecture des Écrans

### Navigation
L'application utilise Expo Router avec une structure basée sur les fichiers :

*   **Navigation par Onglets** : Structure principale cachée
*   **Stack Navigation** : Navigation entre écrans
*   **Modal Navigation** : Authentification et paramètres

### Écrans Principaux

#### 🏠 Écran d'Accueil (`app/(tabs)/index.tsx`)
*   Vue d'ensemble des réunions du jour
*   Accès rapide aux fonctionnalités principales
*   Boutons d'action pour liens publics/privés
*   Intégration réseaux sociaux

#### 🌐 Liens Publics (`app/public-links.tsx`)
*   Liste filtrée des réunions publiques
*   Accès direct sans authentification
*   Informations complètes de connexion

#### 🔒 Liens Privés (`app/private-links.tsx`)
*   Réunions sécurisées avec authentification
*   Système de déverrouillage progressif
*   Gestion des mots de passe

#### ⚙️ Paramètres (`app/settings.tsx`)
*   Configuration de la langue
*   Gestion des notifications
*   Informations de l'application
*   Liens légaux

## Personnalisation

### Modification des Données
Pour ajouter ou modifier des liens de réunion :

```typescript
// data/meetingLinks.ts
export const meetingLinks: MeetingLink[] = [
  {
    id: 'nouveau-lien',
    title: 'Ma Nouvelle Réunion',
    platform: 'zoom',
    link: 'https://zoom.us/j/123456789',
    category: 'public',
    date: '2024-01-15',
    time: '14:00',
    duration: 60,
    organizer: 'Mon Nom',
    // ... autres propriétés
  },
  // ... autres liens
];
```

### Personnalisation du Thème
Les couleurs et styles sont centralisés dans les composants :

```typescript
// Couleurs principales
const COLORS = {
  primary: '#4DCDCD',      // Turquoise principal
  secondary: '#48BB78',     // Vert pour public
  accent: '#F4A460',        // Orange pour privé
  text: '#2D3748',          // Texte principal
  textLight: '#718096',     // Texte secondaire
};
```
Pour personnaliser les effets glassmorphiques, ajustez les propriétés du `GlassmorphicContainer` (intensité, couleurs de dégradé, bordures) ou les styles directement appliqués dans les composants UI.

### Configuration Responsive
Ajustement des breakpoints dans `utils/responsive.ts` :

```typescript
export const getScreenType = () => {
  const isSmallPhone = height < 700;
  const isMediumPhone = height >= 700 && height < 800;
  const isLargePhone = height >= 800;
  // ... logique responsive
};
```

## Développement

### Scripts Disponibles
```bash
npm run dev          # Démarrage du serveur de développement
npm run build:web    # Build de production pour le web
npm run lint         # Vérification du code avec ESLint
```

### Hooks Personnalisés
*   `useResponsive()` : Gestion des dimensions et breakpoints
*   `useMeetingLinkFilters()` : Logique de filtrage des liens
*   `usePrivateLinkAuth()` : Authentification des liens privés
*   `useLanguage()` : Gestion de la langue de l'interface

### Services
*   `MeetingLinkService` : Gestion des interactions avec les plateformes
*   Validation des liens, ouverture d'applications, gestion d'erreurs

### Utilitaires
*   `accessibility.ts` : Helpers pour l'accessibilité
*   `responsive.ts` : Calculs responsive et breakpoints
*   `meetingLink.ts` : Traitement et validation des données

## Déploiement

### Web
```bash
# Build de production
npm run build:web

# Le dossier dist/ contient les fichiers statiques
# Déployable sur Netlify, Vercel, GitHub Pages, etc.
```

### Mobile (Expo)
```bash
# Build pour les stores
expo build:android
expo build:ios

# Ou avec EAS Build (recommandé)
eas build --platform android
eas build --platform ios
```

### Variables d'Environnement
```bash
# .env
EXPO_PUBLIC_API_URL=https://api.example.com
EXPO_PUBLIC_VERSION=1.0.0
```

## Contribution

### Guide de Contribution
1. **Fork** le repository
2. **Créer** une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. **Développer** en suivant les conventions du projet
4. **Tester** sur différentes tailles d'écran
5. **Commit** avec des messages clairs
6. **Push** vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
7. **Ouvrir** une Pull Request

### Standards de Code
*   **TypeScript** : Typage strict obligatoire
*   **ESLint** : Respect des règles de linting
*   **Prettier** : Formatage automatique du code
*   **Accessibilité** : Support des technologies d'assistance
*   **Responsive** : Test sur toutes les tailles d'écran

### Architecture des Composants
*   **Composants Purs** : Pas d'effets de bord
*   **Props Typées** : Interfaces TypeScript complètes
*   **Accessibilité** : Props d'accessibilité systématiques
*   **Tests** : Tests unitaires pour la logique métier

## Roadmap

### Version 1.1
- [ ] Synchronisation cloud des liens personnels
- [ ] Notifications push pour les réunions
- [ ] Widget iOS/Android
- [ ] Mode sombre/clair

### Version 1.2
- [ ] Intégration calendrier
- [ ] Rappels personnalisés
- [ ] Statistiques d'utilisation
- [ ] Export/Import des données

### Version 2.0
- [ ] Collaboration en équipe
- [ ] API publique
- [ ] Plugins tiers
- [ ] Version desktop

## Support et Documentation

### Ressources
*   **Documentation Expo** : [expo.dev/docs](https://expo.dev/docs)
*   **React Native** : [reactnative.dev](https://reactnative.dev)
*   **TypeScript** : [typescriptlang.org](https://typescriptlang.org)

### Problèmes Connus
*   **Web** : Certaines animations peuvent être moins fluides
*   **iOS** : Nécessite Xcode pour le développement natif
*   **Android** : Permissions requises pour les notifications

### FAQ
**Q: Comment ajouter une nouvelle plateforme de réunion ?**
A: Modifier les types dans `types/index.ts` et ajouter la logique dans `services/meetingLinkService.ts`

**Q: L'application fonctionne-t-elle hors ligne ?**
A: Partiellement - les données locales sont accessibles, mais pas les nouvelles réunions

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

### Licences Tierces
*   **Expo et React Native** : Licence MIT
*   **Lucide Icons** : Licence ISC
*   **Autres dépendances** : Voir les licences individuelles dans `package.json`

---

**MinderLink** | Simplifiez la gestion de vos réunions, une connexion à la fois.