import { useState } from 'react';
import {View,TextInput,Text,TouchableOpacity,StyleSheet,KeyboardTypeOptions, KeyboardAvoidingView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
//Propiedades de input personalizado
interface CustomInputProps {
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  type?: 'text' | 'email' | 'password' | 'number';
  error?: string;
}


 //Input reutilizable
export default function CustomInput({
  value,
  placeholder,
  onChangeText,
  type = 'text',
  error,
}: CustomInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  // --- Ternario: determinar keyboardType según el tipo de input ---
  const getKeyboardType = (): KeyboardTypeOptions => {
    if (type === 'email') return 'email-address';
    if (type === 'number') return 'numeric';
    return 'default';
  };

  // --- Ternario: ocultar texto si es password y no se muestra ---
  const isSecure = type === 'password' && !showPassword;

  return (

      <View style={[styles.inputWrapper, error ? styles.inputError : styles.inputNormal]}>
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          onChangeText={onChangeText}
          keyboardType={getKeyboardType()}
          secureTextEntry={isSecure}
          autoCapitalize={type === 'email' ? 'none' : 'sentences'}
          placeholderTextColor="#90A4AE"
        />
        {/* Toggle ojo para password */}
        {type === 'password' && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeButton}
          >
            <Ionicons
              name={showPassword ? 'eye-outline' : 'eye-outline'}
              size={22}
              color="#607D8B"
            />
          </TouchableOpacity>
        )}
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: '#FFFFFF',
  },
  inputNormal: {
    borderColor: '#CFD8DC',
  },
  inputError: {
    borderColor: '#E53935',
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: '#263238',
  },
  eyeButton: {
    padding: 6,
  },
  errorText: {
    color: '#E53935',
    fontSize: 13,
    marginTop: 4,
    marginLeft: 4,
  },
});
