import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import CreateNewTask from "../screens/CreateNewTask";
import Dashboard from "../screens/DashBoard";
import { useAuth } from "../components/contexts/AuthContext";


export type TabsParamList = {
    Dash: undefined;
    Create: undefined;
}

const Tab = createBottomTabNavigator<TabsParamList>();

export default function TabsNavigator () {
const {user} = useAuth();

    return(
        <Tab.Navigator>
            {user?.role ==='common' && (
                <Tab.Screen 
                name = "Dash"
                component={Dashboard}
                options={{headerShown: false}}
            />
            )}
            {/* condicional para mostrar pantalla al admin */}
            {user?.role ==='admin' && (
                <Tab.Screen 
                name = "Create"
                component={CreateNewTask}
                options={{headerShown: false}}
            />
            )}
        </Tab.Navigator>
    );
}
