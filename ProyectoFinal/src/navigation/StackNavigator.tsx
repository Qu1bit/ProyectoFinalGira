import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 👇 Importa el LoginScreen correcto (ajusta la ruta real)
import LoginScreen from '../screens/LoginScreen';
import TabsNavigator from './TabsNavigator';

export type RootStackParamList = {
  Login: undefined;
  // Si no quieres pasar props, déjalo undefined:
  Tabs: undefined;
  // Si quieres abrir una pantalla del tab por defecto, lo defines luego al navegar.
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: true }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: 'Inicio de Sesión' }}
      />
      <Stack.Screen
        name="Tabs"
        component={TabsNavigator}
        options={{ headerShown: false }} // opcional, suele ocultarse en tabs
      />
    </Stack.Navigator>
  );
}