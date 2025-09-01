import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Platform, StatusBar } from 'react-native';
import colors from '../contants/colors';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image source={require('../assets/user.png')} style={styles.avatar} />

      <Text style={styles.name}>Hamza Salahuddin</Text>
      <Text style={styles.email}>hamza@devsinc.com</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Account Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Username:</Text>
          <Text style={styles.value}>hamza.salahuddin</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Role:</Text>
          <Text style={styles.value}>Administrator</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Joined:</Text>
          <Text style={styles.value}>Jan 2, 2002</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 60,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "none",
  },
  name: {
    fontSize: 22,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.text,
    marginBottom: 6,
  },
  email: {
    fontSize: 14,
    color: colors.muted,
    marginBottom: 30,
    fontFamily: 'Poppins_400Regular',
  },
  card: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 14,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.accent,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: colors.muted,
    fontFamily: 'Poppins_400Regular',
  },
  value: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'Poppins_500Medium',
  },
});
