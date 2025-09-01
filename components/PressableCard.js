import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import colors from '../contants/colors';

export default function PressableCard({ icon, label, onPress }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderRadius: 12,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 12,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: colors.text,
    textAlign: 'center',
  },
});
