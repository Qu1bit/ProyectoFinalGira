import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import TaskCard from '../components/TaskCard';
import { useAuth } from '../components/contexts/AuthContext';
import CustomButton from '../components/CustomButton';

export default function Dashboard({ navigation }: any) {
  const { user, logout } = useAuth(); 
      
  return (
    <View style={styles.mainWrapper}>
      {/*Contenido desplazable */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Hola, {user?.username}</Text>
          <Text style={styles.roleText}>Rol: {user?.role}</Text>
        </View>

        <TaskCard
          owner="Emerson"
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
      </ScrollView>

      {/*boton para cerrar sesion fijado en la zona baja */}
      <View style={styles.fixedFooter}>
        <CustomButton 
          title="Cerrar Sesión" 
          onPress={logout} 
          variant="secondary" 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 20,
    paddingVertical: 10,
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
  // --- estilo boton fijo ---
  fixedFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    // Sombras
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 10,
  },
});