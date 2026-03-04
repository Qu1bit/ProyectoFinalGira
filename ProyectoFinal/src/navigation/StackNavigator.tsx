import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import TabsNavigator from './TabsNavigator';

export type RootStackParamList = {
    Login: undefined,
    Tabs: {email: string},
    Dash: undefined,
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
    return(
        <Stack.Navigator initialRouteName='Login' 
        screenOptions={{headerShown: true}}
        >
            <Stack.Screen 
                name="Login" 
                component={LoginScreen} 
                
            />
            <Stack.Screen 
                name="Tabs"
                component = {TabsNavigator}
                
            />
        </Stack.Navigator>
    );
}