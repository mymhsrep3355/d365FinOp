import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigation';
import { PurchaseProvider } from './context/PurchaseContext';

export default function App() {
  return (

    <SafeAreaProvider>
      <NavigationContainer>
        <PurchaseProvider>
          <AppNavigator />
          <StatusBar style="dark" backgroundColor="#F3F2F1" />
        </PurchaseProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

