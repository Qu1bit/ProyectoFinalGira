import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import StackNavigator from './src/navigation/StackNavigator';
import { AuthProvider } from './src/components/contexts/AuthContext';
import { Provider } from 'react-redux';
import { store } from './src/store';

export default function App() {
  
  return (
    <Provider store={store}>
      <AuthProvider>
        <NavigationContainer>
          <StackNavigator/>
        </NavigationContainer>
      </AuthProvider>
    </Provider>
  );
}

