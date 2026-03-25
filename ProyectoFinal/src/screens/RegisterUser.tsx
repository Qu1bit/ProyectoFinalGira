import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from "../components/contexts/AuthContext";
import KeyBoardView from "../components/KeyBoardView";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { User } from "../types/users";
import { addUser } from "../store/slices/userSlice";
import { useAppDispatch } from "../store/hooks";

export default function RegisterScreen({ navigation }: any) {
  const dispatch = useAppDispatch();

  // Estados para cumplir con la interfaz User
  const [name, setName] = useState("");
  const [role, setRole] = useState<'superadmin' | 'common'>('common');
  
  // Estados adicionales para la creación
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<string | null>(null);

  //const { register } = useAuth();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso necesario', 'Se requiere acceso a la galería para subir una foto.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

const handleRegister = async () => {
    if (!email || !password || !name) {
      Alert.alert("Campos requeridos", "Por favor, completa los datos.");
      return;
    }

    const newUser: User = {
      id: Date.now().toString(),
      name: name,
      email: email,
      role: role,
      photo: image || undefined
    };

    // --- ACCIÓN DE REDUX ---
    dispatch(addUser(newUser));

    Alert.alert("Éxito", `Usuario ${name} creado en Redux.`);
    navigation.goBack();
  };

  return (
    <KeyBoardView>
      <View style={styles.mainContainer}>
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Nuevo Usuario</Text>
            <Text style={styles.headerSubtitle}>Configura el perfil del nuevo integrante</Text>
          </View>

          {/* Sección de Foto */}
          <TouchableOpacity style={styles.photoPicker} onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <MaterialIcons name="add-a-photo" size={32} color="#9CA3AF" />
                <Text style={styles.photoText}>Agregar foto</Text>
              </View>
            )}
          </TouchableOpacity>

          <View style={styles.card}>
            <Text style={styles.sectionLabel}>Información del Perfil</Text>
            
            <CustomInput
              label="Nombre completo"
              placeholder="Nombre del usuario"
              value={name}
              onChangeText={setName}
            />

            <CustomInput
              label="Correo electrónico"
              placeholder="correo@ejemplo.com"
              value={email}
              onChangeText={setEmail}

            />

            <CustomInput
              label="Contraseña"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChangeText={setPassword}

            />

            {/* Selector de Rol */}
            <Text style={styles.roleLabel}>Rol de usuario</Text>
            <View style={styles.roleToggle}>
              <TouchableOpacity 
                style={[styles.roleBtn, role === 'common' && styles.roleBtnActive]} 
                onPress={() => setRole('common')}
              >
                <Text style={[styles.roleBtnText, role === 'common' && styles.roleBtnTextActive]}>Común</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.roleBtn, role === 'superadmin' && styles.roleBtnActive]} 
                onPress={() => setRole('superadmin')}
              >
                <Text style={[styles.roleBtnText, role === 'superadmin' && styles.roleBtnTextActive]}>Admin</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.footer}>
            <CustomButton 
              title="Crear Usuario" 
              onPress={handleRegister} 
              variant="primary" 
            />
          </View>
        </ScrollView>
      </View>
    </KeyBoardView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: { 
    height: "100%",
    paddingHorizontal: 24, 
    paddingTop: 40,
    paddingBottom: 40,
    backgroundColor: '#fff' 
  },
  header: { 
    marginBottom: 20,
    alignItems: 'center' 
  },
  headerTitle: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#111827',
  },
  headerSubtitle: { 
    fontSize: 14, 
    color: '#6b7280',
    marginTop: 4,
  },
  photoPicker: {
    alignSelf: 'center',
    marginBottom: 25,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoText: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 4,
    fontWeight: '600',
  },
  card: { 
    backgroundColor: '#fff', 
    borderRadius: 16, 
    padding: 20, 
    marginBottom: 24, 
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  sectionLabel: { 
    fontSize: 11, 
    fontWeight: '700', 
    color: '#4A90D9', 
    textTransform: 'uppercase', 
    letterSpacing: 1,
    marginBottom: 20 
  },
  roleLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginTop: 10,
    marginBottom: 10,
  },
  roleToggle: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
  },
  roleBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  roleBtnActive: {
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  roleBtnText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  roleBtnTextActive: {
    color: '#4A90D9',
    fontWeight: '700',
  },
  footer: { 
    gap: 12,
  }
});