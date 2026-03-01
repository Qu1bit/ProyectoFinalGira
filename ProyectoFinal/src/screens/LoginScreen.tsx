// ============================================
// Pantalla: LoginScreen
// ============================================
import { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

/**
 * Pantalla de inicio de sesión.
 * Incluye validaciones con ternarios y renderizado condicionado.
 */
export default function LoginScreen({ navigation }: any) {
  // --- Estado local ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // --- Validaciones ---
  const emailError =
    submitted && !email.includes('@') ? 'El correo debe incluir @' : '';

  const passwordError =
    submitted && password.length < 6
      ? 'La contraseña debe tener al menos 6 caracteres'
      : '';

  // --- Ternario: determinar si el formulario es válido ---
  const isFormValid = email.includes('@') && password.length >= 6;

  /** Manejar el intento de inicio de sesión */
  const handleLogin = () => {
    setSubmitted(true);
    if (isFormValid) {
      // Navegar a la tab Home dentro del TabsNavigator
      navigation.navigate('Tabs', { screen: 'Home' });
    }
  };

  return (
    <View>
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4352/4352602.png' }}
          style={styles.logo}
        />
        <Text style={styles.appTitle}>Gira</Text>
        <Text style={styles.subtitle}>Organiza tus proyectos</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Iniciar Sesión</Text>

        {/* Input de correo */}
        <CustomInput
          value={email}
          placeholder="Correo electrónico"
          onChangeText={setEmail}
          type="email"
          error={emailError}
        />

        {/* Input de contraseña */}
        <CustomInput
          value={password}
          placeholder="Contraseña"
          onChangeText={setPassword}
          type="password"
          error={passwordError}
        />

        <View style={styles.buttonContainer}>
          <CustomButton
            title="Iniciar Sesión"
            onPress={handleLogin}
            disabled={isFormValid}
            variant="primary"
          />
        </View>

        {isFormValid && submitted ? (
          <Text style={styles.helpText}>
            Por favor, corrige los errores para continuar.
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#263238',
  },
  subtitle: {
    fontSize: 15,
    color: '#78909C',
    marginTop: 4,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#263238',
    marginBottom: 16,
    textAlign: 'center',
  },
 buttonContainer: {
  marginTop: 12,
  alignSelf: "center",
  alignItems: "center",
  justifyContent: "center",
},
  helpText: {
    textAlign: 'center',
    color: '#E53935',
    fontSize: 13,
    marginTop: 10,
  },
});