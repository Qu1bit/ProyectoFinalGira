import React from 'react';
import { View, Text, StyleSheet, ScrollView } from "react-native";
import TaskCard from '../components/TaskCard';
import { useAuth } from '../components/contexts/AuthContext';
import CustomButton from '../components/CustomButton';
import { useAppSelector } from "../store/hooks";

export default function AdminDashboard({ navigation }: any) {
  const { user, logout } = useAuth(); 
  const tasks = useAppSelector(state => state.tasks.tasks);

  return (
    <View style={styles.mainWrapper}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Hola, {user?.name}</Text>
          <Text style={styles.roleText}>Rol: {user?.role}</Text>
        </View>

        <View style={styles.listContainer}>
          {tasks.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No hay tareas registradas en el sistema</Text>
            </View>
          ) : (
            tasks.map(task => (
              <TaskCard 
                key={task.id} 
                {...task} 
              />
            ))
          )}
        </View>
      </ScrollView>

      {/* Footer FIJO */}
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
    paddingBottom: 110, 
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
  listContainer: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    color: '#9ca3af',
    fontSize: 16,
  },
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
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
});