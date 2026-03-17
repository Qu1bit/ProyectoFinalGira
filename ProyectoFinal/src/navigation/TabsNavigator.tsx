import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import CreateNewTask from "../screens/CreateNewTask2";
import Dashboard from "../screens/DashBoardScreen";
import { useAuth } from "../components/contexts/AuthContext";
import CreateNewTask2 from "../screens/CreateNewTask2";
import DashBoardScreen from "../screens/DashBoardScreen";


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
                component={DashBoardScreen}
                options={{headerShown: false}}
            />
            )}
            {/* condicional para mostrar pantalla al admin */}
            {user?.role ==='admin' && (
                <Tab.Screen 
                name = "Create"
                component={CreateNewTask2}
                options={{headerShown: false}}
            />
            )}          
        </Tab.Navigator>
    );
}
