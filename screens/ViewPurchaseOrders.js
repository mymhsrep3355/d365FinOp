import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import colors from '../contants/colors';
import BackButton from '../components/BackButton';



const { width } = Dimensions.get('window');

export default function ViewPurchaseOrders({setSelectedTab, navigation}) {


  return (
    <View style={styles.container}>
        <BackButton/>
      <View style={styles.header}>
        <Text style={styles.title}>View Purchase Orders</Text>
      </View>

      <ScrollView contentContainerStyle={styles.grid}>
        <Text style={styles.title}>List of Purchase Orders</Text>
      </ScrollView>

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
