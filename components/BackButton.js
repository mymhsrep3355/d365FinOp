import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function BackButton() {
  const navigation = useNavigation();

  return (
    <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={24} color="#3c2775ff" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backButton: {
    padding: 10,
    position: 'absolute',
    left: 16,
    top: 50,
    zIndex: 10,
  },
});