import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import TaskCard from '../components/TaskCard';
import { useAuth } from '../components/contexts/AuthContext';
import CustomButton from '../components/CustomButton';
import { useAppSelector } from "../store/hooks";

export default function Dashboard({ navigation }: any) {
  const { user, logout } = useAuth(); 

  const tasks = useAppSelector(state => state.tasks.tasks);

  const userTasks = tasks.filter(task => task.owner === user?.id);
      
  return (
    <View style={styles.mainWrapper}>
      {/*Contenido desplazable */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Hola, {user?.id}</Text>
          <Text style={styles.roleText}>Rol: {user?.role}</Text>
        </View>
      </ScrollView>
      <ScrollView contentContainerStyle={styles.scrollContent}>
  <View style={styles.header}>
    <Text style={styles.welcomeText}>Hola, {user?.name}</Text>
    <Text style={styles.roleText}>Rol: {user?.role}</Text>
  </View>

  {/* LISTA DE TAREAS DEL USUARIO */}
  <View>
    {userTasks.length === 0 ? (
      <Text>No tienes tareas asignadas</Text>
    ) : (
      userTasks.map(task => (
        <TaskCard key={task.id} {...task} />
      ))
    )}
  </View>
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