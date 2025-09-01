import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

import colors from '../../contants/colors';

export default function LoginScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={require('../../assets/d365.png')} style={styles.logo} />
        <Text style={styles.title}>Finance and Operations</Text>
        <Text style={styles.subtitle}>Welcome back</Text>
      </View>

      <View style={styles.footer}>
        <Pressable
          android_ripple={{ color: '#ffffff22' }}
          style={styles.button}
          onPress={() => navigation.navigate('HomeTabs')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>

        <Pressable
          android_ripple={{ color: '#00000010' }}
          style={styles.oauthBtn}
          onPress={() => {}}
        >
          <View style={styles.oauthContent}>
            <AntDesign name="windows" size={20} color={colors.button} style={styles.microsoftIcon} />
            <Text style={styles.oauthText}>Signup with Microsoft</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    //fontFamily: 'Poppins_600SemiBold',
    color: colors.text,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
   // fontFamily: 'Poppins_400Regular',
    color: colors.muted,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    gap: 16,
  },
  button: {
    backgroundColor: colors.button,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    maxWidth: width - 48,
    alignSelf: 'center',
    elevation: 4,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    //fontFamily: 'Poppins_600SemiBold',
    fontFamily: "Popins",
    letterSpacing: 0.5,
  },
  oauthBtn: {
    backgroundColor: '#E6EAF2',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    maxWidth: width - 48,
    alignSelf: 'center',
    elevation: 2,
  },
  oauthContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  microsoftIcon: {
    marginRight: 8,
  },
  oauthText: {
    color: colors.text,
    fontSize: 15,
   // fontFamily: 'Poppins_500Medium',
  },
});
