import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CustomButton from './CustomButton';
import { Task, TaskStatus } from '../types/task';
import { users } from '../types/users';

export default function TaskCard({
  owner: ownerId,
  title, // <-- Agregado
  description,
  createdAt,
  closedAt,
  status: initialStatus, // Renombrado para no chocar con la lógica interna
  isCompleted = false,
}: Task) {
  const [completed, setCompleted] = useState(isCompleted);
  const now = new Date();

  // BUSCAR EL NOMBRE DEL USUARIO USANDO EL ID
  const assignedUser = users.find(u => u.id === ownerId);
  const displayName = assignedUser ? assignedUser.name : 'Usuario';

  // --- Lógica de estados funcional corregida ---
  let status: TaskStatus;
  
  // Convertimos closedAt a objeto Date para comparar correctamente
  const expirationDate = closedAt ? new Date(closedAt) : null;

  if (completed) {
    status = 'completado';
  } else if (expirationDate && now > expirationDate) {
    status = 'vencido';
  } else {
    status = 'pendiente';
  }

  const handleComplete = () => { 
    setCompleted(true);
    // Aquí podrías agregar un dispatch si necesitas actualizar Redux al instante
  };

  return (
    <View style={[
      styles.card,
      status === 'completado' && styles.bgCompleted,
      status === 'vencido' && styles.bgExpired
    ]}>
        {/* Botón de Acción */}
        <View style={styles.absoluteButton}>
          <CustomButton
            title={status === 'completado' ? 'Listo' : 'Finalizar'}
            onPress={handleComplete}
            variant={status === 'completado' ? 'primary' : 'secondary'}
            disabled={status === 'completado'}
          />
        </View>

      {/* Encabezado */}
      <View style={styles.header}>
        <View style={styles.iconCircle}>
          {/* Validación por si owner viene vacío */}
          <Text style={styles.iconLetter}>{displayName[0].toUpperCase()}</Text>
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.ownerText}>{displayName}</Text>
          <Text style={styles.statusTag}>{status.toUpperCase()}</Text>
        </View>
      </View>

      {/* Título y Descripción */}
      <Text style={styles.titleText}>{title}</Text> 
      <Text style={styles.descriptionText}>{description}</Text>

      {/* Contenedor de Fechas */}
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
    </View>
  );
}

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
    paddingRight: 100, // Espacio para que el texto no choque con el botón
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
  titleText: { // Estilo para el título
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
  absoluteButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
});