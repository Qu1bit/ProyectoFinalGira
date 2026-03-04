import { View, StyleSheet, Text } from 'react-native';

interface TaskCardProps {
  owner: string;
  description?: string;
  createdAt?: Date;
  closedAt?: Date;
  isCompleted?:boolean;
}

export default function TaskCard({
  owner,
  description,
  createdAt,
  closedAt,
  isCompleted=false,
}: TaskCardProps) {
  const now = new Date();

  let status: 'pendiente' | 'completado' | 'vencido';
  if (closedAt && now > closedAt) {
    status = 'vencido';
  } else if (closedAt) {
    status = 'completado';
  } else {
    status = 'pendiente';
  }

  return (
    <View
      style={[
        styles.card,
        status === 'pendiente'
          ? styles.cardPending
          : status === 'completado'
          ? styles.cardCompleted
          : styles.cardExpired,
      ]}
    >
      <Text>{owner}</Text>
      <Text>{description}</Text>
      <Text>Creado: {createdAt?.toLocaleDateString()}</Text>
      <Text>Creado: {closedAt?.toLocaleDateString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  cardPending: {
    borderColor: '#f59e0b', // ámbar
    backgroundColor: '#fffbeb',
  },
  cardCompleted: {
    borderColor: '#10b981', // verde
    backgroundColor: '#ecfdf5',
  },
  cardExpired: {
    borderColor: '#ef4444', // rojo
    backgroundColor: '#fef2f2',
  },
});