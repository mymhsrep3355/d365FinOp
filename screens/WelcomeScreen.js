import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
} from 'react-native';
import colors from '../contants/colors';

const { width } = Dimensions.get('window');

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={require('../assets/d365.png')} style={styles.logo} />
         <Text style={styles.appTitle}>Finance and Operations</Text>
      </View>

      <View style={styles.footer}>
        <Pressable
          android_ripple={{ color: '#ffffff22' }}
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
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
  appTitle: {
    marginTop:20,
    fontSize: 20,
    color: colors.text,
    fontFamily: "Popins",
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  logo: {
    width: 160,
    height: 180,
    resizeMode: 'contain',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  button: {
    backgroundColor: colors.button,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    maxWidth: width - 48,
    alignSelf: 'center',
    elevation: 4,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
