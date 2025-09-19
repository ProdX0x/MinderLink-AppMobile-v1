OMFPmeditationPourLaPaixAppMobileDesignOrange

# OMFP - One Minute For Peace Mobile App

<div align="center">
  <img src="./assets/images/icon.png" alt="Memorise & Éveil Logo" width="120" height="120">
  
  **Une application iOS de **
  
  [![React Native](https://img.shields.io/badge/React%20Native-0.79.1-blue.svg)](https://reactnative.dev/)
  [![Expo](https://img.shields.io/badge/Expo-53.0.0-black.svg)](https://expo.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
  [![iOS](https://img.shields.io/badge/iOS-13.0+-lightgrey.svg)](https://developer.apple.com/ios/)
</div>
## Table of Contents
*   [About the Project](#about-the-project)
*   [Features](#features)
*   [Technologies Used](#technologies-used)
*   [Assets](#assets)
*   [Getting Started](#getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Installation](#installation)
    *   [Running the Application](#running-the-application)
*   [Project Structure](#project-structure)
*   [Data Management](#data-management)
*   [Screen Architecture](#screen-architecture)
*   [Customization](#customization)
*   [Contributing](#contributing)
*   [License](#license)

## About the Project

The **OMFP - One Minute For Peace Mobile App** is a cross-platform application built with Expo and React Native, designed to facilitate access to meditation sessions focused on peace. It offers both public and exclusive VIP sessions, providing a user-friendly interface for browsing, filtering, and joining Zoom meetings. The application emphasizes a clean, modular architecture for easy maintenance and scalability.

<p align="center">
<img src="https://github.com/user-attachments/assets/48a91856-6f8d-40d3-a198-65d227c03740" width="150"/>
<img src="https://github.com/user-attachments/assets/dee015aa-40f9-45a5-ad84-57d75bf2ac34" width="150"/>
<img src="https://github.com/user-attachments/assets/060d8850-e36b-41a4-87a9-bea5a892062d" width="150"/>
<img src="https://github.com/user-attachments/assets/34c1a39e-4f04-4b8e-8b09-95a1cbd6d3a8" width="150"/>
<img src="https://github.com/user-attachments/assets/f9628923-4d23-4c65-912e-146656cc13b8" width="150">
<img src="https://github.com/user-attachments/assets/9e9cef83-3236-47e2-b542-0a07446fad65" width="150">
<img src="https://github.com/user-attachments/assets/4b7b27ab-0418-4bb0-ae17-441654dd303e" width="150">
<img src="https://github.com/user-attachments/assets/f315423f-cc3d-4125-8cc2-7d5cd14503aa" width="150">
<img src="https://github.com/user-attachments/assets/01ffba73-a2c1-46d6-855d-91d7bb5a9ba2" width="150">
<img src="https://github.com/user-attachments/assets/b939622e-2890-4416-8c99-c57b7e10350b" width="150">
<img src="https://github.com/user-attachments/assets/63e0d002-4031-462b-af19-6996f3516759" width="150">
<img src="https://github.com/user-attachments/assets/fb7a7cb8-6075-4fb3-ad76-d2479b801519" width="150">
</p>

## Features

*   **Public Sessions:** Access to open meditation sessions for all users.
*   **VIP Sessions:** Exclusive sessions that require a password for access, offering a more private experience.
*   **Detailed Session Information:** View comprehensive details for each session, including region, date, time, duration, instructor, maximum participants, and connection details.
*   **Filtering Options:** Easily filter sessions by day of the week and language to find relevant meditations.
*   **Responsive Design:** The user interface adapts seamlessly to various screen sizes (small, medium, and large mobile devices).
*   **Zoom Integration:** Direct links and information to join meditation sessions via Zoom.
*   **Modular Architecture:** Built with a clear separation of concerns (UI, business logic, data, services) for enhanced maintainability and reusability.
*   **TypeScript:** Developed using TypeScript for improved code quality, type safety, and developer experience.
*   **Accessibility Focus:** Includes utilities to enhance accessibility for a more inclusive user experience.
*   **VIP Authentication:** Secure password-based authentication system for accessing exclusive VIP sessions.
*   **Bilingual Support:** Public sessions include bilingual descriptions (English/French) with toggle functionality.
*   **Advanced UI Components:** Custom gradient backgrounds, glass-morphism effects, and smooth animations.

## Technologies Used

*   **React Native:** A framework for building native mobile apps using React.
*   **Expo:** A framework and platform for universal React applications, enabling rapid development and deployment.
*   **Expo Router:** A file-system based router for Expo and React Native.
*   **TypeScript:** A strongly typed superset of JavaScript that compiles to plain JavaScript.
*   **Lucide React Native:** A collection of beautiful and customizable open-source icons.
*   **React Native Gesture Handler:** Advanced gesture handling for native performance.
*   **React Native Reanimated:** High-performance animations and interactions.
*   **React Native Safe Area Context:** Safe area management for different device screens.
*   **React Native Screens:** Native screen management for better performance.
*   **Expo Linear Gradient:** Beautiful gradient backgrounds and effects.
*   **Expo Linking:** Deep linking and external URL handling.
*   **Expo Vector Icons:** Comprehensive icon library for UI elements.
*   **React Native SVG:** SVG support for scalable graphics.
*   **React Native WebView:** Web content integration within the app.

## Assets

The application uses several key visual assets:

*   **Main Logo:** `assets/images/Logo4peace.png` - The primary logo displayed on the home screen
*   **App Icon:** `assets/images/icon.png` - The application icon used in app stores and device home screens
*   **Favicon:** `assets/images/favicon.png` - Web favicon for browser display
*   **Additional Logos:** Various logo variations available in the assets directory

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

*   **Node.js:** (LTS version recommended) You can download it from [nodejs.org](https://nodejs.org/).
*   **npm** or **Yarn:** Node.js comes with npm. You can install Yarn via `npm install -g yarn`.
*   **Expo CLI:**
    ```bash
    npm install -g expo-cli
    # or
    yarn global add expo-cli
    ```

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository_url> # Replace <repository_url> with the actual URL
    cd OMFPmeditationPourLaPaixAppMobileDesignOrange
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Application

*   **For Development (Mobile - iOS/Android):**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    This command will start the Expo development server. You can then scan the QR code displayed in your terminal using the [Expo Go app](https://expo.dev/client) on your physical mobile device (iOS or Android), or run it on an emulator/simulator.

*   **For Web (Development):**
    ```bash
    npm run dev -- --web
    # or
    yarn dev --web
    ```
    This will open the application in your default web browser.

*   **Building for Web (Production):**
    ```bash
    npm run build:web
    # or
    yarn build:web
    ```
    This command will create a production-ready web build in the `dist` directory, which can then be deployed to a web server.

## Project Structure

The project follows a clean, modular architecture with clear separation of concerns:

```
├── app/                          # Application screens and routing
│   ├── (tabs)/                   # Tab-based navigation screens
│   │   ├── index.tsx            # Home screen with language selection
│   │   └── _layout.tsx          # Tab layout configuration
│   ├── public-sessions.tsx       # Public meditation sessions screen
│   ├── vip-sessions.tsx         # VIP meditation sessions screen
│   ├── vip-auth.tsx             # VIP authentication screen
│   ├── sessions.tsx             # Legacy session screen (for reference)
│   ├── _layout.tsx              # Root layout configuration
│   └── +not-found.tsx           # 404 error screen
├── components/                   # Reusable UI components
│   ├── ui/                      # Basic UI components
│   │   ├── Button.tsx           # Configurable button component
│   │   ├── Header.tsx           # Navigation header component
│   │   ├── SessionCard.tsx      # Session display card
│   │   ├── FilterButton.tsx     # Filter selection button
│   │   ├── FilterBar.tsx        # Horizontal filter bar
│   │   └── EmptyState.tsx       # Empty state display
│   └── screens/                 # Screen-specific components
│       └── SessionsList.tsx     # Sessions list with filtering
├── data/                        # Application data and mock data
│   └── sessions.ts              # Session data (public and VIP)
├── hooks/                       # Custom React hooks
│   ├── useFrameworkReady.ts     # Framework initialization hook
│   ├── useResponsive.ts         # Responsive design hook
│   ├── useSessionFilters.ts     # Session filtering logic
│   └── useVipAuth.ts            # VIP authentication logic
├── services/                    # Business logic and external services
│   └── zoomService.ts           # Zoom integration service
├── types/                       # TypeScript type definitions
│   └── index.ts                 # Global type definitions
├── utils/                       # Utility functions
│   ├── accessibility.ts         # Accessibility helpers
│   ├── responsive.ts            # Responsive design utilities
│   └── session.ts               # Session data processing
└── assets/                      # Static assets (images, fonts)
    └── images/                  # Application images and logos
```

### Key Architecture Principles

*   **Modular Components:** Each UI component is self-contained and reusable
*   **Custom Hooks:** Business logic is extracted into custom hooks for reusability
*   **Service Layer:** External integrations (Zoom) are handled through dedicated services
*   **Type Safety:** Comprehensive TypeScript definitions ensure code reliability
*   **Responsive Design:** Utility functions handle different screen sizes and orientations
*   **Accessibility:** Built-in accessibility support throughout the application

## Data Management

Session data (both public and VIP) is currently stored in `data/sessions.ts`. This file serves as a mock data source for demonstration and development purposes. In a production environment, this data would typically be fetched from a backend API, a database (like Supabase), or a content management system.

### Data Structure
*   **Public Sessions:** Include Zoom links, phone numbers, multilingual descriptions, and scheduling information
*   **VIP Sessions:** Include password-protected access, regional groupings, and exclusive instructor information
*   **Type Safety:** All session data is strictly typed using TypeScript interfaces

## Screen Architecture

The application uses a tab-based navigation structure with the following main screens:

### Application Screens Overview

#### **Introduction & Onboarding**
*   **`app/index.tsx` - Splash Screen / Introduction**
    *   **Purpose:** First-time user onboarding experience featuring an animated slider with multiple slides showcasing meditation benefits
    *   **Features:** Lottie animations, scientific benefits presentation, automatic navigation to main app after completion
    *   **Behavior:** Only shown on first app launch, uses AsyncStorage to track completion status
    *   **Navigation:** Automatically redirects to main home screen after user completes or skips the introduction

#### **Core Application Screens**
*   **`app/(tabs)/index.tsx` - Main Home Screen**
    *   **Purpose:** Central hub and main landing page of the application after onboarding
    *   **Features:** Two primary action buttons (VIP Access & Public Access), language selection interface (currently disabled), responsive design with gradient backgrounds
    *   **Navigation:** Entry point to both VIP authentication and public sessions
    *   **Design:** Features 3D-style buttons with glass-morphism effects and country flag selection grid

*   **`app/public-sessions.tsx` - Public Sessions Screen**
    *   **Purpose:** Browse and access open meditation sessions available to all users without authentication
    *   **Features:** Session filtering by language and day, expandable session cards with detailed information, direct Zoom integration
    *   **Content:** Displays session details including instructor, duration, connection info, bilingual descriptions, and phone numbers
    *   **Accessibility:** Full session information visible including Zoom links and phone numbers for alternative access

*   **`app/vip-auth.tsx` - VIP Authentication Screen**
    *   **Purpose:** Secure gateway for accessing exclusive VIP meditation sessions
    *   **Features:** Password-protected access with visual feedback, benefits explanation, responsive keyboard handling
    *   **Security:** Validates VIP credentials before granting access to exclusive content
    *   **UX:** Includes VIP benefits explanation and help options for users seeking access

*   **`app/vip-sessions.tsx` - VIP Sessions Screen**
    *   **Purpose:** Display and manage access to exclusive VIP meditation sessions for authenticated users
    *   **Features:** Two-tier security system - VIP authentication plus individual session password protection
    *   **Functionality:** Session unlocking mechanism, regional session groupings, exclusive instructor access
    *   **Content:** VIP-specific session details with password-protected connection information

#### **System & Error Screens**
*   **`app/+not-found.tsx` - 404 Error Screen**
    *   **Purpose:** Fallback screen displayed when users attempt to access non-existent routes
    *   **Features:** User-friendly error message with navigation back to home screen
    *   **Accessibility:** Clear error communication and recovery path for users

### Session Management
*   **SessionsList Component:** Unified component for displaying both public and VIP sessions
*   **Filtering System:** Filter sessions by day of the week and language
*   **Session Details:** Expandable cards showing connection information, schedules, and descriptions

**Note:** The file `app/sessions.tsx` contains legacy session logic and mock data. The current implementation uses the modular approach with `SessionsList` component and data from `data/sessions.ts`.

## Customization

*   **Session Data:** To add, remove, or modify meditation sessions, edit the `data/sessions.ts` file.
*   **Styling:** Adjust the visual appearance by modifying the `StyleSheet.create` objects within individual component files (e.g., `components/ui/Button.tsx`, `components/ui/SessionCard.tsx`). For global responsive adjustments, refer to `utils/responsive.ts`.
*   **VIP Password:** The VIP password is hardcoded in `app/vip-auth.tsx` and `hooks/useVipAuth.ts` as `'661'`. For a production application, it is highly recommended to manage such sensitive information securely, for example, by fetching it from an environment variable or a secure backend service.
*   **Empty State Messages:** Customize the messages displayed when no sessions are found by modifying the `emptyStateTitle` and `emptyStateMessage` props passed to the `SessionsList` component in `app/public-sessions.tsx` and `app/vip-sessions.tsx`.
*   **Language Selection:** The home screen includes a language selection interface that is currently disabled. To enable it, modify the `onPress` handlers in the country buttons within `app/(tabs)/index.tsx`.
*   **Responsive Design:** Adjust screen size breakpoints and responsive units in `utils/responsive.ts` to customize the mobile experience.
*   **Gradient Themes:** Modify the `LinearGradient` components throughout the app to change the visual theme and color scheme.

## Contributing

We welcome contributions to improve the OMFP meditation app! Here's how you can contribute:

### Getting Started
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following the existing code style and architecture
4. Test your changes thoroughly on different screen sizes
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Contribution Guidelines
*   Follow the existing TypeScript and React Native conventions
*   Maintain the modular architecture with proper separation of concerns
*   Ensure all new components include accessibility props
*   Test responsive design on small, medium, and large mobile screens
*   Update documentation and type definitions as needed
*   Write clear commit messages and PR descriptions

### Areas for Contribution
*   Additional language support and translations
*   Enhanced accessibility features
*   Performance optimizations
*   UI/UX improvements
*   Additional meditation session features
*   Integration with external meditation platforms

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Third-Party Licenses
*   Expo and React Native: MIT License
*   Lucide Icons: ISC License
*   All other dependencies: See individual package licenses

---

**OMFP - One Minute For Peace** | Bringing peace to the world, one minute at a time.

For more information, visit [www.1min4peace.org](https://www.1min4peace.org)
