import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import colors from '../contants/colors';
import BackButton from '../components/BackButton';
import SuccessMessageCard from '../components/SuccessMessageCard';

export default function POSuccessScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { poNumber } = route.params || {};
  console.log('Received PO Number:', poNumber);

  return (
    <View style={styles.container}>
      <BackButton />
      <SuccessMessageCard
        title="Purchase Order Created"
        buttonText="Back to Home"
        subtitle={poNumber ? `PO Number: ${poNumber}` : ''}
        onButtonPress={() => navigation.navigate('HomeTabs')}
      />
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
});
