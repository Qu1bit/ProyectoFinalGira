import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import TabsNavigator from './TabsNavigator';
import { useAuth } from "../components/contexts/AuthContext";
export type RootStackParamList = {
    Login: undefined,
    Tabs: undefined, // Eliminamos el email ya que el usuario está en el contexto
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
    // Obtenemos el estado de autenticación del contexto
    const { isAuthenticated } = useAuth(); 

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* NAVEGACIÓN CONDICIONAL: 
                Si no está autenticado, solo existe la pantalla de Login.
                Si se autentica, el Stack cambia automáticamente a Tabs. */}
            {!isAuthenticated ? (
                <Stack.Screen 
                    name="Login" 
                    component={LoginScreen} 
                />
            ) : (
                <Stack.Screen 
                    name="Tabs"
                    component={TabsNavigator}
                />
            )}
        </Stack.Navigator>
    );
}