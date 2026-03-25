import React, { useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import KeyBoardView from '../components/KeyBoardView';
import { Task, TaskStatus } from '../types/task';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addTask, updateTask } from '../store/slices/taskSlice';
import CustomButton from '../components/CustomButton';
import { colors } from '../themes/colors';
import CustomInput from '../components/CustomInput';
//import { users } from '../types/users';
import { useAuth } from '../components/contexts/AuthContext';


export default function CreateNewTask({ route, navigation }: any) {
  const users = useAppSelector((state)=> state.users.users)
  const taskId = route.params?.taskbookId;
  const dispatch = useAppDispatch();
  const existingTask = useAppSelector((state) =>
    state.tasks.tasks.find((b) => b.id === taskId)
  );
  const { logout } = useAuth(); 
  
  const isEditing = !!existingTask;

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const [title, setTitle] = useState(existingTask?.title || '');
  const [owner, setOwner] = useState(existingTask?.owner || '');
  const [description, setDescription] = useState(existingTask?.description || '');
  const [status, setStatus] = useState<TaskStatus>(existingTask?.status || 'pendiente');
  const [createdAt, setCreatedAt] = useState(existingTask?.createdAt || '');
  const [closedAt, setClosedAt] = useState(existingTask?.closedAt || '');
  const [showUserList, setShowUserList] = useState(false);

  const resetForm = () => {
    setTitle('');
    setOwner('');
    setDescription('');
    setStatus('pendiente');
    setCreatedAt('');
    setClosedAt('');
    setShowUserList(false);
  };

  const handleOnSaveTask = () => {
    if(!owner || !title){
      Alert.alert('Error', 'El título y el usuario son obligatorios');
      return;
    }
   
    const taskData: Task = {
      id: isEditing ? taskId : Date.now().toString(),
      owner: owner,
      title: title,
      description: description,
      status: status,
      createdAt: createdAt || new Date().toISOString(),
      closedAt: closedAt || '', 
    };

    if (isEditing) {
      dispatch(updateTask(taskData));
      Alert.alert('Éxito', 'Tarea actualizada');
    } else {
      dispatch(addTask(taskData));
      Alert.alert('Éxito', 'Tarea creada');
    }
    navigation.navigate('Tabs', { screen: 'Admin' });
    resetForm();
  };

  return (
    <KeyBoardView>
      {/* 1. Este View principal con flex:1 y fondo blanco elimina la barra gris inferior */}
      <View style={styles.mainContainer}>
        <ScrollView 
          contentContainerStyle={styles.scrollContainer} 
          showsVerticalScrollIndicator={false}
          bounces={false} // Evita que se vea el fondo al rebotar
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{isEditing ? 'Editar Tarea' : 'Nueva Tarea'}</Text>
            <Text style={styles.headerSubtitle}>Completa los campos para organizar tu trabajo</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionLabel}>Información Principal</Text>
            <CustomInput
              label="Título de la actividad"
              placeholder='Ej: Revisión de presupuesto'
              value={title}
              onChangeText={setTitle}
            />
            
            <CustomInput
              label="Descripción o Notas"
              placeholder="Detalla de qué trata esta tarea..."
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionLabel}>Planificación</Text>
            <View style={styles.row}>
              <View style={{ flex: 1, marginRight: 10 }}>
                <CustomInput
                  placeholder='AAAA-MM-DD'
                  label='Fecha Inicio'
                  value={createdAt}
                  onChangeText={setCreatedAt}
                  isDate
                />
              </View>
              <View style={{ flex: 1 }}>
                <CustomInput
                  placeholder="AAAA-MM-DD"
                  label='Fecha Fin'
                  value={closedAt}
                  onChangeText={setClosedAt}
                  isDate
                />
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionLabel}>Asignación</Text>
            <CustomInput
              label="Usuario responsable"
              value={users.find(u => u.id === owner)?.name || ''}
              placeholder="Selecciona un usuario de la lista"
              pressable
              onPress={() => setShowUserList(!showUserList)}
            />
            {showUserList && (
              <View style={styles.dropdown}>
                {users.map((user) => (
                  <Text
                    key={user.id}
                    style={[
                      styles.option,
                      owner === user.id && styles.selectedOption
                    ]}
                    onPress={() => {
                      setOwner(user.id);
                      setShowUserList(false);
                    }}
                  >
                    {user.name}
                  </Text>
                ))}
              </View>
            )}
          </View>

          <View style={styles.footer}>
            <CustomButton
              title={isEditing ? 'Guardar Cambios' : 'Crear Tarea'}
              onPress={handleOnSaveTask}
              variant="primary"         
            />
            
            <CustomButton 
              title="Cancelar" 
              onPress={logout} 
              variant="secondary" 
            />
          </View>
        </ScrollView>
      </View>
    </KeyBoardView>
  );
}

const styles = StyleSheet.create({
  // ESTO ES LO QUE SOLUCIONA EL PROBLEMA:
  mainContainer: {
    flex: 1,
    backgroundColor: '#f9fafb', // O '#fff' si prefieres blanco puro
  },
  scrollContainer: { 
    paddingHorizontal: 20, 
    paddingTop: 40, 
    height: "100%",
    backgroundColor: colors.background 
  },
  header: { 
    marginBottom: 25 
  },
  headerTitle: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#111827' 
  },
  headerSubtitle: { 
    fontSize: 14, 
    color: '#6b7280',
    marginTop: 4
  },
  card: { 
    backgroundColor: '#fff', 
    borderRadius: 16, 
    padding: 20, 
    marginBottom: 16, 
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
    letterSpacing: 1,
    marginBottom: 15 
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    marginTop: -5,
    marginBottom: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  option: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    color: '#374151',
  },
  selectedOption: {
    backgroundColor: '#eff6ff',
    color: '#2563eb',
    fontWeight: '600',
  },
  footer: { 
    marginTop: 10,
    gap: 12,
    paddingBottom: 20
  }
});