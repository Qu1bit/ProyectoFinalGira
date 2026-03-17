import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CustomButton from '../CustomButton';
import type { TaskStatus } from '../../types/task';

type Props = {
  owner: string;
  description?: string;
  status: TaskStatus;
  createdLabel?: string;
  closedLabel?: string;
  onComplete: () => void;
  canComplete?: boolean;
};

export const TaskCardView: React.FC<Props> = ({
  owner,
  description,
  status,
  createdLabel,
  closedLabel,
  onComplete,
  canComplete = true,
}) => {
  const completed = status === 'completado';

  return (
    <View
      style={[
        styles.card,
        completed && styles.bgCompleted,
        status === 'vencido' && styles.bgExpired,
      ]}
    >
      {/* Botón */}
      <View style={styles.absoluteButton}>
        <CustomButton
          title={completed ? 'Completada' : 'Finalizar'}
          onPress={onComplete}
          variant={completed ? 'primary' : 'secondary'}
          disabled={!canComplete || completed}
        />
      </View>

      {/* Encabezado */}
      <View style={styles.header}>
        <View style={styles.iconCircle}>
          <Text style={styles.iconLetter}>{owner?.[0]?.toUpperCase()}</Text>
        </View>
        <View>
          <Text style={styles.ownerText}>{owner}</Text>
          <Text style={styles.statusTag}>{status.toUpperCase()}</Text>
        </View>
      </View>

      {!!description && <Text style={styles.descriptionText}>{description}</Text>}

      {/* Fechas */}
      <View style={styles.dateContainer}>
        <View style={styles.dateRow}>
          <Text style={styles.dateLabel}>Creado:</Text>
          <Text style={styles.dateValue}>{createdLabel}</Text>
        </View>
        <View style={styles.dateRow}>
          <Text style={styles.dateLabel}>Cierre:</Text>
          <Text style={styles.dateValue}>{closedLabel}</Text>
        </View>
      </View>
    </View>
  );
};

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
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, paddingRight: 80 },
  iconCircle: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: '#2196F3',
    justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  iconLetter: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  ownerText: { fontSize: 16, fontWeight: '700', color: '#1f2937' },
  statusTag: { fontSize: 10, fontWeight: '800', color: '#6b7280', letterSpacing: 0.5 },
  descriptionText: { fontSize: 15, color: '#4b5563', marginBottom: 20, lineHeight: 20 },
  dateContainer: { backgroundColor: '#f9fafb', borderRadius: 12, padding: 12, marginBottom: 20 },
  dateRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  dateLabel: { fontSize: 12, color: '#9ca3af' },
  dateValue: { fontSize: 12, fontWeight: '600', color: '#374151' },
  absoluteButton: { position: 'absolute', top: 15, right: 15, zIndex: 1, minWidth: 90 },
});

export default TaskCardView;