import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import TabsNavigator from './TabsNavigator';
import { useAuth } from "../components/contexts/AuthContext";
export type RootStackParamList = {
    Login: undefined,
    Tabs: undefined,
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
    // Obtenemos el estado del contexto
    const { isAuthenticated } = useAuth(); 

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* NAVEGACION CONDICIONAL: 
                solo se ve la pantalla de Login si esta autenticado
                al autenticar, el Stack cambia a Tabs. */}
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