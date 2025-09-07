import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigation';
import { PurchaseProvider } from './context/PurchaseContext';
import { GetPurchaseOrderProvider } from './context/GetPurchaseOrderContext';
import { ViewPOLinesProvider } from './context/ViewPOLinesContext';

export default function App() {
  return (

    <SafeAreaProvider>
      <NavigationContainer>
        <PurchaseProvider>
          <GetPurchaseOrderProvider>
            <ViewPOLinesProvider>
              <AppNavigator />
              <StatusBar style="dark" backgroundColor="#F3F2F1" />
            </ViewPOLinesProvider>
          </GetPurchaseOrderProvider>
        </PurchaseProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

