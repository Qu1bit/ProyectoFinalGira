import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import TaskCard from '../components/TaskCard'
import { useAuth } from "../components/contexts/AuthContext";
import CustomButton from "../components/CustomButton";


export default function Dashboard({ navigation }: any) {
  // Se toma el usuario y la función de logout del contexto
  const { user, logout } = useAuth(); 
      
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {/* Encabezado personalizado con el nombre del usuario */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Hola, {user?.username}</Text>
          <Text style={styles.roleText}>Rol: {user?.role}</Text>
        </View>

        <View>
          <TaskCard
            owner={"Emerson"}
            description="Hacer Foro"
            createdAt={new Date()}
            closedAt={new Date('2026-03-10T17:00:00-06:00')}
          />
          <TaskCard
            owner="Emerson"
            description="Hacer Foro"
            createdAt={new Date()}
            closedAt={new Date('2026-03-02T17:00:00-06:00')}
          />
        </View>

        <View style={styles.logoutSection}>
          <CustomButton title="Cerrar Sesión" onPress={logout} variant="secondary" />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f9fafb',
  },
  header: {
    marginBottom: 20,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
  },
  roleText: {
    fontSize: 14,
    color: '#6b7280',
    textTransform: 'capitalize',
  },
  logoutSection: {
    marginTop: 20,
    marginBottom: 40,
    alignItems: 'center',
  },
});