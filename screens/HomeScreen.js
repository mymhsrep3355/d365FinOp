import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import PressableCard from '../components/PressableCard';
import BottomTabBar from '../components/BottomTabBar';
import colors from '../contants/colors';
// import { useNavigation } from '@react-navigation/native';

// const navigation = useNavigation();


const { width } = Dimensions.get('window');

export default function HomeScreen({setSelectedTab, navigation}) {
  const actions = [
    { label: 'Create PO', icon: require('../assets/purchase-order.png'), screen: 'PO1' },
    { label: 'View POs', icon: require('../assets/check-list.png'), screen: 'ViewPO'  },
    { label: 'Create SO', icon: require('../assets/stock-rotation.png') , screen: 'PO1'  },
    { label: 'View SOs', icon: require('../assets/check-list.png') , screen: 'PO1' },
    { label: 'Inventory', icon: require('../assets/inventory.png'), screen: 'PO1'  },
    { label: 'Customers', icon: require('../assets/users.png') , screen: 'PO1' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/d365.png')} style={styles.logo} />
        <Text style={styles.title}>Finance & Operations</Text>
      </View>

      <ScrollView contentContainerStyle={styles.grid}>
        {actions.map((action, index) => (
          <View style={styles.cardWrapper} key={index}>
            <PressableCard
              icon={action.icon}
              label={action.label}
              onPress={() => navigation.navigate(action.screen)} 
            />
          </View>
        ))}
      </ScrollView>

      {/* <BottomTabBar /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: colors.background,
    elevation: 4,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.text,
    marginTop: 6,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 100,
  },
  cardWrapper: {
    width: (width - 48) / 2,
    marginBottom: 16,
  },
});
