import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeScreen from "../screens/LoginScreen";
import CreateNewTask from "../screens/CreateNewTask";
import Dashboard from "../screens/DashBoard";


export type TabsParamList = {
    Dash: undefined;
    Create: undefined;
}

const Tab = createBottomTabNavigator<TabsParamList>();

export default function TabsNavigator () {

    return(
        <Tab.Navigator>
            <Tab.Screen 
                name = "Dash"
                component={Dashboard}
                options={{headerShown: false}}
            />
            <Tab.Screen 
                name = "Create"
                component={CreateNewTask}
                options={{headerShown: false}}
            />

        </Tab.Navigator>
    );
}
