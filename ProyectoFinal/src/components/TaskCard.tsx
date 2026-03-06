import { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CustomButton from './CustomButton';


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
  //cambios en el estado completado de Task
  const[completed, setCompleted] = useState(isCompleted);
  const now = new Date();

  let status: 'pendiente' | 'completado' | 'vencido';
  //cambio en el if de isCompleted a completed (lin 27 y 29), solo asi se puede 
  // actualizar el estado de task por medio del setCompleted definido en lin 22
  if (completed && closedAt && now <= closedAt) {
    status = 'completado';
  } else if (!completed && closedAt && now > closedAt) {
    status = 'vencido';
  } else {
    status = 'pendiente';
  }

  const handleComplete = () => {setCompleted(true)};


  return (
      <View
      style={[styles.card, 
        status === 'pendiente' ? styles.cardPending : status === 'completado'
        ? styles.cardCompleted : styles.cardExpired,
      ]}
      >
      <Text>{owner}</Text>
      <Text>{description}</Text>
      <Text>Creado: {createdAt?.toLocaleDateString()}</Text>
      <Text>Cierra: {closedAt?.toLocaleDateString()}</Text>

        <View style={styles.buttonContainer}>
          <CustomButton
          title={completed ? 'Completada' : 'Marcar completada'}
          onPress={handleComplete}
          variant={completed ? 'primary' : 'secondary'}
          disabled={completed}
          />
        </View>
        
    
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
    borderColor: '#20ac32', // verde
    backgroundColor: '#8ff3d2',
  },
  cardExpired: {
    borderColor: '#ef4444', // rojo
    backgroundColor: '#fef2f2',
  },
  buttonContainer: {
  marginRight: 5,
  alignSelf: "center",
  //alignItems: "center",
  justifyContent: "center",
},
});