import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import colors from '../contants/colors';

export default function SuccessMessageCard({
  icon = 'checkmark-circle',
  iconColor = '#4BB543',
  title = 'Success!',
  subtitle = '',
  message = 'Your action was completed successfully.',
  //buttonText = 'Done',
  //onButtonPress,
}) {
  return (
    <View style={styles.card}>
      <Ionicons name={icon} size={80} color={iconColor} style={styles.icon} />

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {subtitle ? <Text style={styles.message}>{subtitle}</Text> : null}

      {/* {onButtonPress && (
        <Pressable style={styles.button} onPress={onButtonPress}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </Pressable>
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.text,
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#2d00a9',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
  },
});
