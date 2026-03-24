import React, { useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import KeyBoardView from '../components/KeyBoardView';
import { Task, TaskStatus } from '../types/task';
import { useAppDispatch } from '../store/hooks';
import { updateTask } from '../store/slices/taskSlice';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';

export default function EditTask({ route, navigation }: any) {
  const taskToEdit: Task = route.params.task;
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const [description, setDescription] = useState(taskToEdit.description || '');
  const [newComment, setNewComment] = useState(''); 

  const handleSaveAndExit = (shouldFinish: boolean) => {
    // 1. Capturamos fecha y hora actual para el comentario
    const now = new Date();
    const timestamp = now.toLocaleString(); // Ejemplo: "21/3/2026, 23:35:00"

    // 2. Preparamos la descripción con el timestamp incluido
    const finalDescription = newComment.trim() 
      ? `${description}\n\n• [${timestamp}]: ${newComment}` 
      : description;

    let finalStatus: TaskStatus;
    let finalClosedAt: string | undefined;

    if (shouldFinish) {
      finalStatus = 'completado';
      finalClosedAt = now.toISOString(); // Usamos la misma constante 'now'
    } else {
      finalStatus = 'pendiente';
      finalClosedAt = taskToEdit.closedAt;
    }

    const updatedTask: Task = {
      ...taskToEdit,
      description: finalDescription,
      status: finalStatus,
      closedAt: finalClosedAt,
    };

    dispatch(updateTask(updatedTask));
    
    if (shouldFinish) {
      Alert.alert('¡Misión Cumplida!', 'La tarea ha sido finalizada con éxito.');
    }
    
    navigation.goBack();
  };

  return (
    <KeyBoardView>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Actualizar Tarea</Text>
          <Text style={styles.headerSubtitle}>Registra tus avances o finaliza la actividad</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Tarea</Text>
          <Text style={styles.titleText}>{taskToEdit.title}</Text>
          
          <View style={styles.divider} />
          
          <Text style={styles.label}>Descripción Histórica</Text>
          <View style={styles.currentDescBox}>
            <Text style={styles.descriptionContent}>
              {description || "No hay notas previas registradas."}
            </Text>
          </View>
        </View>

        <View style={styles.inputSection}>
          <CustomInput
            label="¿Qué has avanzado hoy?"
            placeholder="Escribe aquí los nuevos detalles..."
            value={newComment}
            onChangeText={setNewComment}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.footer}>
          <CustomButton
            title="Finalizar y Guardar"
            onPress={() => handleSaveAndExit(true)}
            disabled={false}
            variant="primary"
          />

          <CustomButton
            title="Guardar Avances"
            onPress={() => handleSaveAndExit(false)}
            disabled={false}
            variant="secondary"
          />

          <View style={styles.dividerSmall} />

          <CustomButton 
            title="Descartar Cambios" 
            onPress={() => navigation.goBack()} 
            disabled={false}
            variant="secondary" 
          />
        </View>
      </ScrollView>
    </KeyBoardView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { 
    paddingHorizontal: 20, 
    paddingTop: 40, 
    paddingBottom: 50, 
    backgroundColor: '#f9fafb' 
  },
  header: { 
    marginBottom: 25 
  },
  headerTitle: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    color: '#111827' 
  },
  headerSubtitle: { 
    fontSize: 14, 
    color: '#6b7280' 
  },
  card: { 
    backgroundColor: '#fff', 
    borderRadius: 16, 
    padding: 20, 
    marginBottom: 20, 
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  sectionLabel: { 
    fontSize: 11, 
    fontWeight: '700', 
    color: '#4A90D9', 
    textTransform: 'uppercase', 
    marginBottom: 8 
  },
  titleText: { 
    fontSize: 18, 
    fontWeight: '600', 
    color: '#1f2937' 
  },
  divider: { 
    height: 1, 
    backgroundColor: '#f3f4f6', 
    marginVertical: 15 
  },
  dividerSmall: { 
    height: 1, 
    backgroundColor: '#f3f4f6', 
    marginVertical: 10 
  },
  label: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#4b5563', 
    marginBottom: 8 
  },
  currentDescBox: { 
    backgroundColor: '#f9fafb', 
    padding: 12, 
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: '#e5e7eb' 
  },
  descriptionContent: { 
    fontSize: 14, 
    color: '#4b5563', 
    lineHeight: 20,
    fontStyle: 'italic' 
  },
  inputSection: { 
    marginBottom: 20 
  },
  footer: { 
    gap: 8 
  },
});