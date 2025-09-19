/**
 * Hook personnalisé pour l'authentification des liens privés
 * Gère l'état d'authentification et les opérations associées
 */

import { useState, useCallback } from 'react';
import type { UsePrivateLinkAuthReturn } from '@/types';

const PRIVATE_LINK_PASSWORD = '661';

/**
 * Hook pour gérer l'authentification des liens privés
 */
export const usePrivateLinkAuth = (): UsePrivateLinkAuthReturn => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /**
   * Authentifie un utilisateur avec un mot de passe
   */
  const authenticate = useCallback(async (password: string): Promise<boolean> => {
    // Simulation d'une vérification asynchrone
    return new Promise((resolve) => {
      setTimeout(() => {
        const isValid = password === PRIVATE_LINK_PASSWORD;
        setIsAuthenticated(isValid);
        resolve(isValid);
      }, 500);
    });
  }, []);

  /**
   * Déconnecte l'utilisateur
   */
  const logout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  return {
    isAuthenticated,
    authenticate,
    logout,
  };
};