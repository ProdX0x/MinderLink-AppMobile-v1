/**
 * Contexte de gestion de la langue
 * Fournit la langue sélectionnée à toute l'application
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LanguageContextType {
  selectedLanguage: string;
  setLanguage: (language: string) => Promise<void>;
  isLanguageLoaded: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('fr');
  const [isLanguageLoaded, setIsLanguageLoaded] = useState(false);

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      console.log('🔍 [LANGUAGE-CONTEXT] Chargement de la langue sauvegardée...');
      const savedLanguage = await AsyncStorage.getItem('selectedLanguage');
      console.log('📱 [LANGUAGE-CONTEXT] Langue trouvée:', savedLanguage);
      if (savedLanguage) {
        setSelectedLanguage(savedLanguage);
        console.log('✅ [LANGUAGE-CONTEXT] Langue appliquée:', savedLanguage);
      } else {
        console.log('🌍 [LANGUAGE-CONTEXT] Aucune langue sauvegardée - Utilisation du défaut (fr)');
      }
    } catch (error) {
      console.error('Erreur lors du chargement de la langue:', error);
      console.log('⚠️ [LANGUAGE-CONTEXT] Erreur de chargement - Utilisation du défaut (fr)');
    } finally {
      console.log('🏁 [LANGUAGE-CONTEXT] Chargement terminé - isLanguageLoaded = true');
      setIsLanguageLoaded(true);
    }
  };

  const setLanguage = async (language: string) => {
    try {
      console.log('💾 [LANGUAGE-CONTEXT] Sauvegarde de la nouvelle langue:', language);
      await AsyncStorage.setItem('selectedLanguage', language);
      setSelectedLanguage(language);
      console.log('✅ [LANGUAGE-CONTEXT] Langue sauvegardée et appliquée avec succès');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la langue:', error);
      console.log('⚠️ [LANGUAGE-CONTEXT] Erreur de sauvegarde de la langue');
    }
  };

  return (
    <LanguageContext.Provider value={{ selectedLanguage, setLanguage, isLanguageLoaded }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};