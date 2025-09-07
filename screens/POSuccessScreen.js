import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import colors from '../contants/colors';
import BackButton from '../components/BackButton';
import SuccessMessageCard from '../components/SuccessMessageCard';

export default function POSuccessScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { poNumber, header } = route.params || {};
  console.log('Received PO Number:', poNumber);
  console.log('Received Header:', header);
  
  const handleBackHome = () => {
    navigation.navigate('HomeTabs');
  };
  const handleAddLine = () => {
    navigation.navigate('CreatePOLine', {
      poNumber,
      currentLine: 1,
      headerDefaults: {
        DeliveryAddressStreet: header?.data?.DeliveryAddressStreet,
        DeliveryAddressCity: header?.data?.DeliveryAddressCity,
        DeliveryAddressZipCode: header?.data?.DeliveryAddressZipCode,
        DeliveryAddressCountyId: header?.data?.DeliveryAddressCountyId,
        DeliveryAddressLocationId: header?.data?.DeliveryAddressLocationId,
        DeliveryAddressName: header?.data?.DeliveryAddressName || 'Site 1',
        ReceivingSiteId: header?.data?.DefaultReceivingSiteId,
        FormattedDeliveryAddress: header?.data?.FormattedDeliveryAddress,
        DeliveryAddressStateId: header?.data?.DeliveryAddressStateId || '',
      },
    });
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <SuccessMessageCard
        title="Purchase Order Created"
        //buttonText="Back to Home"
        subtitle={poNumber ? `PO Number: ${poNumber}` : ''}
      //onButtonPress={() => navigation.navigate('HomeTabs')}
      />
      <View style={styles.buttonContainer}>
        <Pressable style={[styles.button, styles.homeButton]} onPress={handleBackHome}>
          <Text style={styles.buttonText}>Back to Home</Text>
        </Pressable>

        <Pressable style={[styles.button, styles.addLineButton]} onPress={handleAddLine}>
          <Text style={styles.buttonText}>Add PO Line</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingTop: 100,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 30,
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 140,
  },
  homeButton: {
    backgroundColor: '#4B5563',
  },
  addLineButton: {
    backgroundColor: '#2563eb',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
  },
});