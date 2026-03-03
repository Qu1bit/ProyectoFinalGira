import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
//import HomeScreen from "../screens/HomeScreen";
import TabsNavigator from './TabsNavigator';
import Dashboard from '../screens/DashBoard';

export type RootStackParamList = {
    Login: undefined,
    Tabs: {email?: string} | undefined,
    dash: undefined,
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
    return(
        <Stack.Navigator initialRouteName='Login' 
        screenOptions={{headerShown: true}}
        >
            {/* <Stack.Screen 
                name="Home"
                component={HomeScreen}
            /> */}
            <Stack.Screen 
                name="Login" 
                component={LoginScreen} 
                options={{title:'Inicio de Sesion'}}
            />
           <Stack.Screen
                name="dash"
                component={Dashboard}
                options={{ title: 'Dashboard' }}
            />
        </Stack.Navigator>
    );
}