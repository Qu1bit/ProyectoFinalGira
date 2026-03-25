import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Task, TaskStatus } from '../types/task';
import { useAppSelector } from "../store/hooks";

export default function TaskCard({
  owner: ownerId,
  title,
  description,
  createdAt,
  closedAt,
  status: initialStatus,
  isCompleted = false,
  onPress, 
}: Task & { onPress?: () => void }) {
  
  const now = new Date();

  // Obtener la lista de usuarios DINÁMICA desde Redux
  const usersFromRedux = useAppSelector((state) => state.users.users);

  //buscar el nombre del usuario usando el ID en la lista de Redux
  const assignedUser = usersFromRedux.find(u => u.id === ownerId);
  const displayName = assignedUser ? assignedUser.name : 'Usuario Desconocido';

  // --- Lógica de estados corregida ---
  let status: TaskStatus;
  const expirationDate = closedAt ? new Date(closedAt) : null;

  if (initialStatus === 'completado' || isCompleted) {
    status = 'completado';
  } else if (expirationDate && now > expirationDate) {
    status = 'vencido';
  } else {
    status = 'pendiente';
  }

  return (
    <TouchableOpacity 
      activeOpacity={0.7} 
      onPress={onPress} 
      style={[
        styles.card,
        status === 'completado' && styles.bgCompleted,
        status === 'vencido' && styles.bgExpired
      ]}
    >
      <View style={styles.header}>
        <View style={styles.iconCircle}>
          {/* Usamos el nombre dinámico para la letra del avatar */}
          <Text style={styles.iconLetter}>
            {displayName ? displayName[0].toUpperCase() : '?'}
          </Text>
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.ownerText}>{displayName}</Text>
          <Text style={styles.statusTag}>{status.toUpperCase()}</Text>
        </View>
      </View>

      <Text style={styles.titleText}>{title}</Text> 
      <Text style={styles.descriptionText}>{description}</Text>

      <View style={styles.dateContainer}>
        <View style={styles.dateRow}>
          <Text style={styles.dateLabel}>Creado:</Text>
          <Text style={styles.dateValue}>
            {createdAt ? new Date(createdAt).toLocaleDateString() : 'Sin Fecha'}
          </Text>
        </View>
        <View style={styles.dateRow}>
          <Text style={styles.dateLabel}>Cierre:</Text>
          <Text style={styles.dateValue}>
            {closedAt ? new Date(closedAt).toLocaleDateString() : 'Sin Fecha'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// Los estilos se mantienen iguales...
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  bgCompleted: { backgroundColor: '#f0fdf4', borderColor: '#bcf0da' },
  bgExpired: { backgroundColor: '#fef2f2', borderColor: '#fecaca' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTextContainer: {
    flex: 1,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconLetter: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  ownerText: { fontSize: 14, fontWeight: '600', color: '#6b7280' },
  statusTag: { fontSize: 10, fontWeight: '800', color: '#9ca3af', letterSpacing: 0.5 },
  titleText: { 
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  descriptionText: {
    fontSize: 15,
    color: '#4b5563',
    marginBottom: 20,
    lineHeight: 20,
  },
  dateContainer: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 12,
  },
  dateRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  dateLabel: { fontSize: 12, color: '#9ca3af' },
  dateValue: { fontSize: 12, fontWeight: '600', color: '#374151' },
});