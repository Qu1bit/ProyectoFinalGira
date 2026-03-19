import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingViewComponent,
} from 'react-native';
import KeyBoardView from '../components/KeyBoardView';
import { Task, TaskStatus } from '../types/task';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addTask, updateTask } from '../store/slices/taskSlice';
import CustomButton from '../components/CustomButton';
import { colors } from '../themes/colors';
import CustomInput from '../components/CustomInput';

{/*
const statusOptions: { key: TaskStatus; label: string; icon: any }[] = [
  { key: 'pending', label: 'Pendiente', icon: 'taskmark-outline' },
  { key: 'reading', label: 'En Lectura', icon: 'auto-stories' },
  { key: 'read', label: 'Leído', icon: 'check-circle' },
];
*/}


export default function CreateNewTask({ route, navigation }: any) {
  const taskId = route.params?.taskbookId;
  const dispatch = useAppDispatch();
  const existingTask = useAppSelector((state) =>
    state.tasks.tasks.find((b) => b.id === taskId)
  );

  
  const isEditing = !!existingTask;

  const [title, setTitle] = useState(existingTask?.title || '');
  const [owner, setOwner] = useState(existingTask?.owner || '');
  const [description, setDescription] = useState(existingTask?.description || '');
  const [status, setStatus] = useState<TaskStatus>(existingTask?.status || 'pendiente');
  const [createdAt, setCreatedAt] = useState(existingTask?.createdAt || '');
  const [closedAt, setClosedAt] = useState(existingTask?.closedAt || '');
  //const [showGenrePicker, setShowGenrePicker] = useState(false);

  const handleOnSaveTask = () => {
    const now = new Date(); 
    const endDate = new Date(closedAt);

    if (!owner && endDate > now){
      Alert.alert ('Asigne un usuario', 'La fecha final no puede menor que la fecha actual')
      return;
    }
    const taskData: Task = {
      id: existingTask?.id || Date.now().toString(),
      owner,
      description,
      title,
      createdAt: existingTask?.createdAt || new Date().toISOString(),
      closedAt: existingTask?.closedAt || new Date().toISOString(), 
      status:existingTask?.status || "pendiente",     
    };

    if (isEditing) {
      dispatch(updateTask(taskData));
    } else {
      dispatch(addTask(taskData));
    }
    navigation.goBack();
  };
  return (
    <KeyBoardView>
      <View style={styles.form}>
        <View style={styles.container}>
          <CustomInput
            placeholder='Titulo'
            value={title}
            onChangeText={setTitle}
          />
          <CustomInput
            placeholder='Descripcion'
            value={description}
            onChangeText={setDescription}
            multiline={true}
          />
          <Text>
            Sugerencia 1
          </Text>
          <Text>
            Sugerencia 2
          </Text>
          <CustomInput
            label="Descripción"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={5}
          />
          <CustomInput
            placeholder='2026-01-01'
            label='Fecha Inicio'
            value={createdAt}
            onChangeText={setCreatedAt}
            isDate
          />
          <CustomInput
            placeholder="2026-12-31"
            label='Fecha Fin'
            value={closedAt}
            onChangeText={setClosedAt}
            isDate
          />
          <CustomButton
            title={isEditing ? 'Guardar Cambios' : 'Agregar Tarea'}
            onPress={()=>{}}
            variant="secondary"         
          />
        </View>

      </View>
    </KeyBoardView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  form: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },

});
