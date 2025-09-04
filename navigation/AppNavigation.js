import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import CustomTabNavigator from './CustomTabNavigator';
import CreatePOStep1Screen from '../screens/CreatePOStep1Screen';
import CreatePOStep2Screen from '../screens/CreatePOStep2Screen';
import POSuccessScreen from '../screens/POSuccessScreen';
import ViewPurchaseOrders from '../screens/ViewPurchaseOrders';


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      {/* <Stack.Screen name='Home' component={HomeScreen}/> */}
      <Stack.Screen name='HomeTabs' component={CustomTabNavigator} />
      <Stack.Screen name='PO1' component={CreatePOStep1Screen} />
      <Stack.Screen name='PO2' component={CreatePOStep2Screen} />
      <Stack.Screen name='POSuccess' component={POSuccessScreen} />
      <Stack.Screen name='ViewPO' component={ViewPurchaseOrders} />
    </Stack.Navigator>
  );
}
