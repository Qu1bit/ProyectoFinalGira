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
import { users } from '../types/users';
import { useAuth } from '../components/contexts/AuthContext';

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
  const { logout } = useAuth(); 
  
  const isEditing = !!existingTask;

  const [title, setTitle] = useState(existingTask?.title || '');
  const [owner, setOwner] = useState(existingTask?.owner || '');
  const [description, setDescription] = useState(existingTask?.description || '');
  const [status, setStatus] = useState<TaskStatus>(existingTask?.status || 'pendiente');
  const [createdAt, setCreatedAt] = useState(existingTask?.createdAt || '');
  const [closedAt, setClosedAt] = useState(existingTask?.closedAt || '');
  const [showUserList, setShowUserList] = useState(false);
  //const [showGenrePicker, setShowGenrePicker] = useState(false);

  const handleOnSaveTask = () => {
    //comienzo nuevo codigo
    if(!owner){
      Alert.alert('Error', 'Seleccione un usuario');
      return;
    }

    {/* codigo anterior
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

    */}

    
    const taskData: Task = {
    id: isEditing ? taskId : Date.now().toString(),
    owner: owner, // El ID que seleccionaste en el dropdown
    title: title,
    description: description,
    status: status,
    createdAt: createdAt || new Date().toISOString(),
    closedAt: closedAt || new Date().toISOString(),
    };


    if (isEditing) {
      dispatch(updateTask(taskData));
    } else {
      dispatch(addTask(taskData));
    }
    //navigation.goBack();
  }; //fin de nuevo codigo


  return (
    <KeyBoardView>
      <View style={styles.form}>
        <View style={styles.container}>
          <CustomInput
            placeholder='Titulo'
            value={title}
            onChangeText={setTitle}
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
          <CustomInput
            label="Asignar usuario"
            value={users.find(u => u.id === owner)?.name || ''}
            placeholder="Selecciona un usuario"
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
          <CustomButton
            title={isEditing ? 'Guardar Cambios' : 'Agregar Tarea'}
            onPress={handleOnSaveTask}
            variant="secondary"         
          />
          <CustomButton 
                    title="Cerrar Sesión" 
                    onPress={logout} 
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
  dropdown: {
  borderWidth: 1,
  borderColor: '#CFD8DC',
  borderRadius: 10,
  marginTop: 5,
  backgroundColor: '#fff',
},

option: {
  padding: 12,
  borderBottomWidth: 1,
  borderBottomColor: '#eee',
},

selectedOption: {
  backgroundColor: '#e3f2fd',
},

});
