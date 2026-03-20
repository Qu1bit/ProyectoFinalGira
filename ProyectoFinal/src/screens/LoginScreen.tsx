import { useState } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import KeyBoardView from '../components/KeyBoardView';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useAuth } from '../components/contexts/AuthContext';

export default function LoginScreen({ navigation }: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const { login } = useAuth();

  const userError = submitted && username.length === 0 ? 'Ingrese un usuario' : '';
  const passwordError = submitted && password.length < 4 ? 'Contraseña muy corta' : '';

  const isFormValid = username.length > 0 && password.length >= 4;

const handleLogin = () => {
  setSubmitted(true);

  if (isFormValid) {
    const success = login(username, password);

    if (!success) {
      Alert.alert(
        "Error de acceso",
        "Usuario o contraseña incorrectos. Intente con 'superadmin' o 'cristhian'."
      );
    }
  }
};

  return (
    <KeyBoardView>
      <View style={styles.container}>

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

          <CustomInput
            value={username}
            placeholder="Correo electrónico"
            onChangeText={setUsername}
            type="email"
            error={userError}
          />
       
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
              disabled={!isFormValid}
              variant="primary"
            />
          </View>

          {submitted && !isFormValid ? (
            <Text style={styles.helpText}>
              Por favor, corrige los errores para continuar.
            </Text>
          ) : null}
        </View>
      </View>
    </KeyBoardView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    justifyContent: 'center',
    backgroundColor: '#ECEFF1',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  logo: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 14,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#263238',
  },
  subtitle: {
    fontSize: 16,
    color: '#607D8B',
    marginTop: 4,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 26,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 5,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#263238',
    marginBottom: 18,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  helpText: {
    textAlign: 'center',
    color: '#D32F2F',
    fontSize: 13,
    marginTop: 10,
  },
});