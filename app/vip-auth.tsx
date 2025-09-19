import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from 'react-native';
import { useEffect, useCallback } from 'react';
import { useRouter, useFocusEffect } from 'expo-router';
import { ArrowLeft, Lock, Eye, EyeOff } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const VIP_PASSWORD = '661';

export default function VipAuthScreen() {
  const router = useRouter();
  
  // États principaux avec valeurs par défaut
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  // Fonction de réinitialisation complète des états
  const resetAuthState = useCallback(() => {
    setPassword('');
    setShowPassword(false);
    setIsLoading(false);
    setKeyboardVisible(false);
  }, []);

  // Gestion du focus de l'écran - réinitialisation à chaque retour
  useFocusEffect(
    useCallback(() => {
      // Réinitialisation des états lors du focus
      resetAuthState();
      
      // Cleanup function appelée lors de la perte de focus
      return () => {
        // Nettoyage des états lors de la sortie
        setIsLoading(false);
        setKeyboardVisible(false);
      };
    }, [resetAuthState])
  );

  // Gestion des listeners de clavier avec nettoyage approprié
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        // Vérification que le composant est toujours monté
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        // Vérification que le composant est toujours monté
        setKeyboardVisible(false);
      }
    );

    // Nettoyage obligatoire des listeners
    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

  // Fonction d'authentification avec gestion d'erreur améliorée
  const handleAuthentication = useCallback(() => {
    // Prévention des appels multiples
    if (isLoading) return;
    
    // Validation du mot de passe
    if (!password.trim()) {
      Alert.alert(
        'Champ requis',
        'Veuillez saisir votre mot de passe VIP.',
        [{ text: 'OK', style: 'default' }]
      );
      return;
    }

    if (password === VIP_PASSWORD) {
      setIsLoading(true);
      
      // Simulation d'authentification avec gestion d'erreur
      setTimeout(() => {
        try {
          router.push('/vip-sessions');
        } catch (error) {
          // En cas d'erreur de navigation, réinitialiser l'état
          console.error('Erreur de navigation:', error);
          setIsLoading(false);
          Alert.alert(
            'Erreur',
            'Une erreur est survenue lors de l\'accès aux salles VIP.',
            [{ text: 'OK', style: 'default' }]
          );
        }
      }, 500);
    } else {
      Alert.alert(
        'Accès refusé',
        'Le mot de passe saisi est incorrect. Veuillez réessayer.',
        [{ 
          text: 'OK', 
          style: 'default',
          onPress: () => {
            // Réinitialisation du champ après erreur
            setPassword('');
            setShowPassword(false);
          }
        }]
      );
    }
  }, [password, isLoading, router]);

  // Fonction de retour avec nettoyage d'état
  const goBack = useCallback(() => {
    // Nettoyage des états avant la navigation
    resetAuthState();
    
    // Navigation de retour
    try {
      router.back();
    } catch (error) {
      console.error('Erreur de navigation retour:', error);
      // Fallback vers l'écran principal
      router.replace('/');
    }
  }, [router, resetAuthState]);

  // Fonction de basculement de visibilité du mot de passe
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Dégradé d'arrière-plan radial turquoise */}
      <LinearGradient
        colors={['#4DCDCD', '#3BBABA', '#2A9999']}
        locations={[0, 0.7, 1]}
        style={styles.backgroundGradient}
      />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header avec bouton retour */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={goBack}>
              <ArrowLeft size={24} color="#4A5568" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Accès VIP</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Contenu principal */}
          <View style={[styles.content, keyboardVisible && styles.contentWithKeyboard]}>
            <View style={styles.iconContainer}>
              <Lock size={60} color="#F4A460" />
            </View>

            <Text style={styles.title}>Salle VIP</Text>
            <Text style={styles.subtitle}>
              Accédez aux sessions exclusives et aux fonctionnalités premium
            </Text>

            {!keyboardVisible && (
              <View style={styles.benefitsContainer}>
                <Text style={styles.benefitsTitle}>Avantages VIP :</Text>
                <Text style={styles.benefitItem}>• Sessions de méditation privées</Text>
                <Text style={styles.benefitItem}>• Accès aux mots de passe Zoom</Text>
                <Text style={styles.benefitItem}>• Salles dédiées par région</Text>
                <Text style={styles.benefitItem}>• Support prioritaire</Text>
              </View>
            )}

            <View style={styles.passwordContainer}>
              <Text style={styles.passwordLabel}>Mot de passe VIP</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.passwordInput}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  placeholder="Saisissez votre mot de passe"
                  placeholderTextColor="#A0AEC0"
                  keyboardType="numeric"
                  maxLength={10}
                  onSubmitEditing={handleAuthentication}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff size={20} color="#718096" />
                  ) : (
                    <Eye size={20} color="#718096" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={[isLoading && styles.authButtonLoading]}
              onPress={handleAuthentication}
              disabled={isLoading || !password.trim()}
            >
              <LinearGradient
                colors={['#FFE0B3', '#FFC266', '#FF9933', '#E67A00', '#CC5500']}
                locations={[0, 0.15, 0.4, 0.7, 1]}
                style={styles.authButton}
              >
                <Text style={styles.authButtonText}>
                  {isLoading ? 'Authentification...' : 'Accéder aux Salles VIP'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {!keyboardVisible && (
              <TouchableOpacity style={styles.helpButton}>
                <Text style={styles.helpText}>
                  Besoin d'aide pour obtenir l'accès VIP ?
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    minHeight: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    minHeight: 400,
  },
  contentWithKeyboard: {
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D3748',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  benefitsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  benefitsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 15,
  },
  benefitItem: {
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 8,
    lineHeight: 20,
  },
  passwordContainer: {
    marginBottom: 30,
  },
  passwordLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 10,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(240, 240, 240, 0.9)',
    borderRadius: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(190, 190, 190, 0.6)',
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: '#2D3748',
  },
  eyeButton: {
    padding: 4,
  },
  authButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
  authButtonLoading: {
    opacity: 0.7,
  },
  authButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  helpButton: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  helpText: {
    fontSize: 14,
    color: '#4299E1',
    textDecorationLine: 'underline',
  },
});