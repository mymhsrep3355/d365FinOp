// import React, { useState } from 'react';
// import {
//   View,
//   StyleSheet,
//   Pressable,
//   Image,
//   Platform,
//   Dimensions,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { BlurView } from 'expo-blur';

// const { width } = Dimensions.get('window');

// export default function BottomTabBar() {
//   const navigation = useNavigation();
//   const [selectedTab, setSelectedTab] = useState('home');

//   const handlePress = (tab) => {
//     setSelectedTab(tab);
//     // navigation.navigate(tab); // Uncomment if you have named routes
//   };

//   return (
//     <View style={styles.wrapper}>
//       <BlurView intensity={50} tint="light" style={styles.container}>
//         {/* User Tab */}
//         <Pressable onPress={() => handlePress('user')} style={styles.tab}>
//           <View style={selectedTab === 'user' ? styles.activeIconWrapper : null}>
//             <Image
//               source={require('../assets/user.png')}
//               style={[
//                 styles.icon,
//                 selectedTab === 'user' && styles.activeIconTint,
//               ]}
//             />
//           </View>
//         </Pressable>

//         {/* Home Tab */}
//         <Pressable onPress={() => handlePress('home')} style={styles.homeTab}>
//           <View
//             style={[
//               styles.homeIconWrapper,
//               selectedTab !== 'home' && styles.inactiveHomeIconWrapper,
//             ]}
//           >
//             <Image
//               source={require('../assets/home.png')}
//               style={styles.homeIcon}
//             />
//           </View>
//         </Pressable>

//         {/* Settings Tab */}
//         <Pressable onPress={() => handlePress('settings')} style={styles.tab}>
//           <View style={selectedTab === 'settings' ? styles.activeIconWrapper : null}>
//             <Image
//               source={require('../assets/settings.png')}
//               style={[
//                 styles.icon,
//                 selectedTab === 'settings' && styles.activeIconTint,
//               ]}
//             />
//           </View>
//         </Pressable>
//       </BlurView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   wrapper: {
//     position: 'absolute',
//     bottom: Platform.OS === 'ios' ? 20 : 16,
//     width: width,
//     alignItems: 'center',
//     zIndex: 10,
//   },
//   container: {
//     flexDirection: 'row',
//     width: width - 32,
//     paddingVertical: 14,
//     paddingHorizontal: 24,
//     backgroundColor: 'rgba(255, 255, 255, 0.6)',
//     borderRadius: 28,
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOpacity: 0.08,
//     shadowRadius: 12,
//     shadowOffset: { width: 0, height: 4 },
//     overflow: 'hidden',
//   },
//   tab: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   icon: {
//     width: 26,
//     height: 26,
//     resizeMode: 'contain',
//     tintColor: '#323130',
//   },
//   homeTab: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   homeIconWrapper: {
//     backgroundColor: '#2d00a9ff',
//     padding: 14,
//     borderRadius: 40,
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//     shadowOffset: { width: 0, height: 2 },
//   },
//   inactiveHomeIconWrapper: {
//     backgroundColor: '#d0cfea',
//   },
//   homeIcon: {
//     width: 30,
//     height: 30,
//     tintColor: '#fff',
//     resizeMode: 'contain',
//   },
//   activeIconWrapper: {
//     backgroundColor: '#d0cfea',
//     padding: 12,
//     borderRadius: 30,
//   },
//   activeIconTint: {
//     tintColor: '#2d00a9ff',
//   },
// });

import React from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Image,
  Platform,
  Dimensions,
} from 'react-native';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

export default function BottomTabBar({ navigation, selectedTab, setSelectedTab }) {
  const handlePress = (tab) => {
    setSelectedTab(tab);
    navigation.navigate(tab); // ✅ navigate to the actual screen
  };

  return (
    <View style={styles.wrapper}>
      <BlurView intensity={50} tint="light" style={styles.container}>
        
        {/* Profile Tab */}
        <Pressable onPress={() => handlePress('Profile')} style={styles.tab}>
          <View style={selectedTab === 'Profile' ? styles.activeIconWrapper : null}>
            <Image
              source={require('../assets/user.png')}
              style={[
                styles.icon,
                selectedTab === 'Profile' && styles.activeIconTint,
              ]}
            />
          </View>
        </Pressable>

        {/* Home Tab */}
        <Pressable onPress={() => handlePress('Home')} style={styles.homeTab}>
          <View
            style={[
              styles.homeIconWrapper,
              selectedTab !== 'Home' && styles.inactiveHomeIconWrapper,
            ]}
          >
            <Image
              source={require('../assets/home.png')}
              style={styles.homeIcon}
            />
          </View>
        </Pressable>

        {/* Settings Tab */}
        <Pressable onPress={() => handlePress('Settings')} style={styles.tab}>
          <View style={selectedTab === 'Settings' ? styles.activeIconWrapper : null}>
            <Image
              source={require('../assets/settings.png')}
              style={[
                styles.icon,
                selectedTab === 'Settings' && styles.activeIconTint,
              ]}
            />
          </View>
        </Pressable>

      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 20 : 16,
    width: width,
    alignItems: 'center',
    zIndex: 10,
  },
  container: {
    flexDirection: 'row',
    width: width - 32,
    paddingVertical: 14,
    paddingHorizontal: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 28,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
    tintColor: '#323130',
  },
  homeTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeIconWrapper: {
    backgroundColor: '#2d00a9ff',
    padding: 14,
    borderRadius: 40,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  inactiveHomeIconWrapper: {
    backgroundColor: '#d0cfea',
  },
  homeIcon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
    resizeMode: 'contain',
  },
  activeIconWrapper: {
    backgroundColor: '#d0cfea',
    padding: 12,
    borderRadius: 30,
  },
  activeIconTint: {
    tintColor: '#2d00a9ff',
  },
});
