import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigation';
import { PurchaseProvider } from './context/PurchaseContext';
import { GetPurchaseOrderProvider } from './context/GetPurchaseOrderContext';

export default function App() {
  return (

    <SafeAreaProvider>
      <NavigationContainer>
        <PurchaseProvider>
          <GetPurchaseOrderProvider>
            <AppNavigator />
            <StatusBar style="dark" backgroundColor="#F3F2F1" />
          </GetPurchaseOrderProvider>
        </PurchaseProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

