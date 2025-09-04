import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../contants/colors';
import BackButton from '../components/BackButton';
import SuccessMessageCard from '../components/SuccessMessageCard';

export default function POSuccessScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <BackButton />
      <SuccessMessageCard
        title="Purchase Order Created"
        buttonText="Back to Home"
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
