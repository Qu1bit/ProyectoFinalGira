import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import StackNavigator from './src/navigation/StackNavigator';
import { AuthProvider } from './src/components/contexts/AuthContext';

export default function App() {
  
  return (
    <AuthProvider>
      <NavigationContainer>
        <StackNavigator/>
      </NavigationContainer>
    </AuthProvider>
  );
}

