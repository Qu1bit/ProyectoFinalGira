import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import TabsNavigator from './TabsNavigator';
import EditTask from "../screens/EditTask"; // 👈 Importa tu pantalla
import { useAuth } from "../components/contexts/AuthContext";
import { Task } from '../types/task'; // Importa el tipo Task

// Agregamos EditTask a la lista de parámetros
export type RootStackParamList = {
  Login: undefined;
  Tabs: undefined;
  EditTask: { task: Task }; // 👈 Definimos que recibe una tarea
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Tabs" component={TabsNavigator} />
          {/* 👇 Esta pantalla ahora es accesible desde cualquier lugar del Stack */}
          <Stack.Screen 
            name="EditTask" 
            component={EditTask} 
            options={{ headerShown: true, title: 'Editar Tarea' }} 
          />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}