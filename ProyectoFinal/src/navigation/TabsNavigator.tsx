import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from "../components/contexts/AuthContext";
import CreateNewTask from "../screens/CreateNewTask";
import DashBoard from "../screens/DashBoard";
import RegisterUser from "../screens/RegisterUser";
import AdminDashBoard from "../screens/AdminDashBoard";

export type TabsParamList = {
    Dash: undefined;
    Create: undefined;
    Register: undefined;
    Admin: undefined;
}

const Tab = createBottomTabNavigator<TabsParamList>();

export default function TabsNavigator() {
    const { user } = useAuth();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#4A90D9', // Color del icono activo
                tabBarInactiveTintColor: '#9CA3AF', // Color del icono inactivo
                tabBarIcon: ({ color, size }) => {
                    let iconName: keyof typeof MaterialIcons.glyphMap;

                    if (route.name === 'Dash') {
                        iconName = 'dashboard';
                    } else if (route.name === 'Create') {
                        iconName = 'add-task';
                    } else if (route.name === 'Register') {
                        iconName = 'person-add-alt-1';
                    } 
                    else {
                        iconName = 'dashboard';
                    }

                    return <MaterialIcons name={iconName} size={size + 4} color={color} />;
                },
            })}
        >
            {user?.role === 'common' && (
                <Tab.Screen 
                    name="Dash"
                    component={DashBoard}
                    options={{ tabBarLabel: 'Tablero' }}
                />
            )}
            {user?.role === 'superadmin' && (
                <Tab.Screen 
                    name="Create"
                    component={CreateNewTask}
                    options={{ tabBarLabel: 'Nueva Tarea' }}
                />
            )}
            {user?.role === 'superadmin' && (
                <Tab.Screen 
                    name="Admin"
                    component={AdminDashBoard}
                    options={{ tabBarLabel: 'Tablero' }}
                />
            )}
            {user?.role === 'superadmin' && (
                <Tab.Screen 
                    name="Register"
                    component={RegisterUser}
                    options={{ tabBarLabel: 'Usuarios' }}
                />
            )}          
        </Tab.Navigator>
    );
}