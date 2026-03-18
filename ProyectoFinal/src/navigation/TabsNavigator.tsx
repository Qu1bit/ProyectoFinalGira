import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useAuth } from "../components/contexts/AuthContext";
import CreateNewTask from "../screens/CreateNewTask";
import DashBoard from "../screens/DashBoard";


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
                component={DashBoard}
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
