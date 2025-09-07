import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import BackButton from '../components/BackButton';
import FormField from '../components/FormField';
import colors from '../contants/colors';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function CreatePOLineScreen({ navigation, route }) {
  const { poNumber, currentLine = 1, headerDefaults = {} } = route.params;
  const url = process.env.EXPO_PUBLIC_BASE_URL;
  const [form, setForm] = useState({
    LineNumber: currentLine,
    ItemNumber: 'M0019',
    OrderedPurchaseQuantity: Number('60.10'),
    LineDescription: 'Diisocyanate',
    PurchasePrice: Number('1.36'),
    PurchaseUnitSymbol: 'lb',
    SalesTaxItemGroupCode: 'SPB',
    DeliveryAddressStreet: headerDefaults?.DeliveryAddressStreet || '123 Coffee Street',
    DeliveryAddressCity: headerDefaults?.DeliveryAddressCity || 'New Brunswick',
    DeliveryAddressZipCode: headerDefaults?.DeliveryAddressZipCode || '08901',
    DeliveryAddressCountyId: headerDefaults?.DeliveryAddressCountyId || 'SUSSEX',
    DeliveryAddressLocationId: headerDefaults?.DeliveryAddressLocationId || '000001096',
    ReceivingSiteId: headerDefaults?.ReceivingSiteId || '3',
    DeliveryAddressName: headerDefaults?.DeliveryAddressName || 'Site 3',
    DeliveryAddressStateId: headerDefaults?.DeliveryAddressStateId || 'NJ',
    ReceivingWarehouseId: '31',
  });

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    const qty = parseFloat(form.OrderedPurchaseQuantity);
    const price = parseFloat(form.PurchasePrice);
    const lineAmount = 1;

    const payload = {
      ...form,
      dataAreaId: 'usmf',
      LineNumber: Number(form.LineNumber),
      OrderedPurchaseQuantity: Number(form.OrderedPurchaseQuantity),
      PurchasePrice: Number(form.PurchasePrice),
      PurchaseOrderNumber: poNumber,
      RequestedDeliveryDate: '2016-11-26T12:00:00Z',
      RequestedShippingDate: '1900-01-01T12:00:00Z',
      ConfirmedDeliveryDate: '1900-01-01T12:00:00Z',
      ConfirmedShippingDate: '1900-01-01T12:00:00Z',
      DeliveryAddressDescription: form.DeliveryAddressName,
      DeliveryAddressCountryRegionId: 'USA',
      DeliveryAddressCountryRegionISOCode: 'US',
      FixedAssetTransactionType: 'Acquisition',
      IsDeliveryAddressPrivate: 'No',
      IsDeliveryAddressOrderSpecific: 'No',
      CalculateLineAmount: 'Yes',
      LineAmount: Number(lineAmount),
    };

    console.log("lines payload", payload);

    try {
      const res = await axios.post(
        // 'https://fcc09c61fc3e.ngrok-free.app/api/po/lines/create',
        `${url}/api/po/lines/create`,
        payload
      );
      console.log('Line Created:', res.data);
      Alert.alert('Success', 'PO Line created successfully');
    } catch (error) {
      console.error('Error creating PO Line:', error.response?.data || error.message);
      Alert.alert('Error', 'Failed to create PO Line');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.header}>
            <BackButton />
            <View style={styles.headerTextContainer}>
              <Text style={styles.heading}>Add PO Line</Text>
              <Text style={styles.subheading}>PO#: {poNumber}</Text>
            </View>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>Product Info</Text>
            <FormField label="Line Number" value={form.LineNumber} onChangeText={text => handleChange('LineNumber', text)} />
            <FormField label="Item Number" value={form.ItemNumber} placeholder="e.g. M0019" onChangeText={text => handleChange('ItemNumber', text)} />
            <FormField label="Description" value={form.LineDescription} onChangeText={text => handleChange('LineDescription', text)} />
            <FormField label="Quantity" value={form.OrderedPurchaseQuantity} keyboardType="numeric" onChangeText={text => handleChange('OrderedPurchaseQuantity', text)} />
            <FormField label="Unit Price" value={form.PurchasePrice} keyboardType="numeric" onChangeText={text => handleChange('PurchasePrice', text)} />
            <FormField label="Unit Symbol" value={form.PurchaseUnitSymbol} placeholder="e.g. lb" onChangeText={text => handleChange('PurchaseUnitSymbol', text)} />
            <FormField label="Tax Group Code" value={form.SalesTaxItemGroupCode} placeholder="e.g. SPB" onChangeText={text => handleChange('SalesTaxItemGroupCode', text)} />

            <Text style={styles.sectionTitle}>Delivery Info</Text>
            <FormField label="Street" value={form.DeliveryAddressStreet} onChangeText={text => handleChange('DeliveryAddressStreet', text)} />
            <FormField label="City" value={form.DeliveryAddressCity} onChangeText={text => handleChange('DeliveryAddressCity', text)} />
            <FormField label="Zip Code" value={form.DeliveryAddressZipCode} onChangeText={text => handleChange('DeliveryAddressZipCode', text)} />
            <FormField label="County ID" value={form.DeliveryAddressCountyId} onChangeText={text => handleChange('DeliveryAddressCountyId', text)} />
            <FormField label="Location ID" value={form.DeliveryAddressLocationId} onChangeText={text => handleChange('DeliveryAddressLocationId', text)} />
            <FormField label="State ID" value={form.DeliveryAddressStateId} onChangeText={text => handleChange('DeliveryAddressStateId', text)} />
            <FormField label="Delivery Name" value={form.DeliveryAddressName} onChangeText={text => handleChange('DeliveryAddressName', text)} />
            <FormField label="Receiving Site ID" value={form.ReceivingSiteId} onChangeText={text => handleChange('ReceivingSiteId', text)} />
            <FormField label="Warehouse ID" value={form.ReceivingWarehouseId} onChangeText={text => handleChange('ReceivingWarehouseId', text)} />
          </View>
        </ScrollView>

        <View style={styles.bottomContainer}>
          <Pressable style={styles.nextButton} onPress={handleSubmit}>
            <Text style={styles.nextButtonText}>Submit Line</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 80 : 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: colors.primary,
  },
  headerTextContainer: {
    marginTop: 20,
  },
  heading: {
    fontSize: 28,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.text,
    marginBottom: 4,
  },
  subheading: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: colors.text,
    opacity: 0.7,
  },
  formContainer: {
    backgroundColor: '#f8f9fa',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
    paddingHorizontal: 20,
    // minHeight: height * 0.7,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#1a1a1a',
    marginBottom: 16,
    paddingLeft: 4,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,

    elevation: 10,
  },
  nextButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
    shadowColor: '#2563eb',
    shadowOpacity: 0.3,
    shadowRadius: 8,

    elevation: 8,
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontFamily: 'Poppins_600SemiBold',
    letterSpacing: 0.5,
  },
});



// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   StyleSheet,
//   Dimensions,
//   Pressable,
//   KeyboardAvoidingView,
//   Platform,
//   StatusBar,
//   Alert,
//   ToastAndroid,
// } from 'react-native';
// import BackButton from '../components/BackButton';
// import FormField from '../components/FormField';
// import colors from '../contants/colors';
// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';

// export default function CreatePOLineScreen({ navigation, route }) {
//   const { poNumber, currentLine = 1, headerDefaults = {} } = route.params;

//   const [form, setForm] = useState({
//     LineNumber: currentLine,
//     ItemNumber: 'M0019',
//     OrderedPurchaseQuantity: Number('60.10'),
//     LineDescription: 'Diisocyanate',
//     PurchasePrice: Number('1.36'),
//     PurchaseUnitSymbol: 'lb',
//     SalesTaxItemGroupCode: 'SPB',
//     DeliveryAddressStreet: headerDefaults?.DeliveryAddressStreet || '123 Coffee Street',
//     DeliveryAddressCity: headerDefaults?.DeliveryAddressCity || 'New Brunswick',
//     DeliveryAddressZipCode: headerDefaults?.DeliveryAddressZipCode || '08901',
//     DeliveryAddressCountyId: headerDefaults?.DeliveryAddressCountyId || 'SUSSEX',
//     DeliveryAddressLocationId: headerDefaults?.DeliveryAddressLocationId || '000001096',
//     ReceivingSiteId: headerDefaults?.ReceivingSiteId || '3',
//     DeliveryAddressName: headerDefaults?.DeliveryAddressName || 'Site 3',
//     DeliveryAddressStateId: headerDefaults?.DeliveryAddressStateId || 'NJ',
//     ReceivingWarehouseId: '31',
//   });

//   const [lineCreated, setLineCreated] = useState(false);

//   const handleChange = (name, value) => {
//     setForm({ ...form, [name]: value });
//   };

//   const handleSubmit = async () => {
//     const payload = {
//       ...form,
//       dataAreaId: 'usmf',
//       LineNumber: Number(form.LineNumber),
//       OrderedPurchaseQuantity: Number(form.OrderedPurchaseQuantity),
//       PurchasePrice: Number(form.PurchasePrice),
//       PurchaseOrderNumber: poNumber,
//       RequestedDeliveryDate: '2016-11-26T12:00:00Z',
//       RequestedShippingDate: '1900-01-01T12:00:00Z',
//       ConfirmedDeliveryDate: '1900-01-01T12:00:00Z',
//       ConfirmedShippingDate: '1900-01-01T12:00:00Z',
//       DeliveryAddressDescription: form.DeliveryAddressName,
//       DeliveryAddressCountryRegionId: 'USA',
//       DeliveryAddressCountryRegionISOCode: 'US',
//       FixedAssetTransactionType: 'Acquisition',
//       IsDeliveryAddressPrivate: 'No',
//       IsDeliveryAddressOrderSpecific: 'No',
//       CalculateLineAmount: 'Yes',
//       LineAmount: 1,
//     };

//     try {
//       const res = await axios.post(
//         'https://fcc09c61fc3e.ngrok-free.app/api/po/lines/create',
//         payload
//       );
//       console.log('Line Created:', res.data);

//       if (Platform.OS === 'android') {
//         ToastAndroid.show(`Line #${form.LineNumber} posted successfully`, ToastAndroid.SHORT);
//       } else {
//         Alert.alert('Success', `Line #${form.LineNumber} posted successfully`);
//       }

//       setLineCreated(true);
//     } catch (error) {
//       console.error('Error creating PO Line:', error.response?.data || error.message);
//       Alert.alert('Error', 'Failed to create PO Line');
//     }
//   };

//   const handleAddMoreLine = () => {
//     navigation.replace('CreatePOLineScreen', {
//       poNumber,
//       currentLine: form.LineNumber + 1,
//       headerDefaults,
//     });
//   };

//   const handleGoHome = () => {
//     navigation.navigate('HomeTabs'); 
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

//       <KeyboardAvoidingView
//         style={styles.keyboardView}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
//       >
//         <ScrollView
//           style={styles.scrollView}
//           contentContainerStyle={styles.scrollContent}
//           showsVerticalScrollIndicator={false}
//           bounces={false}
//         >
//           <View style={styles.header}>
//             <BackButton />
//             <View style={styles.headerTextContainer}>
//               <Text style={styles.heading}>Add PO Line</Text>
//               <Text style={styles.subheading}>PO#: {poNumber}</Text>
//             </View>
//           </View>

//           <View style={styles.formContainer}>
//             <Text style={styles.sectionTitle}>Product Info</Text>
//             <FormField label="Line Number" value={form.LineNumber.toString()} onChangeText={text => handleChange('LineNumber', text)} />
//             <FormField label="Item Number" value={form.ItemNumber} onChangeText={text => handleChange('ItemNumber', text)} />
//             <FormField label="Description" value={form.LineDescription} onChangeText={text => handleChange('LineDescription', text)} />
//             <FormField label="Quantity" value={form.OrderedPurchaseQuantity.toString()} keyboardType="numeric" onChangeText={text => handleChange('OrderedPurchaseQuantity', text)} />
//             <FormField label="Unit Price" value={form.PurchasePrice.toString()} keyboardType="numeric" onChangeText={text => handleChange('PurchasePrice', text)} />
//             <FormField label="Unit Symbol" value={form.PurchaseUnitSymbol} onChangeText={text => handleChange('PurchaseUnitSymbol', text)} />
//             <FormField label="Tax Group Code" value={form.SalesTaxItemGroupCode} onChangeText={text => handleChange('SalesTaxItemGroupCode', text)} />

//             <Text style={styles.sectionTitle}>Delivery Info</Text>
//             <FormField label="Street" value={form.DeliveryAddressStreet} onChangeText={text => handleChange('DeliveryAddressStreet', text)} />
//             <FormField label="City" value={form.DeliveryAddressCity} onChangeText={text => handleChange('DeliveryAddressCity', text)} />
//             <FormField label="Zip Code" value={form.DeliveryAddressZipCode} onChangeText={text => handleChange('DeliveryAddressZipCode', text)} />
//             <FormField label="County ID" value={form.DeliveryAddressCountyId} onChangeText={text => handleChange('DeliveryAddressCountyId', text)} />
//             <FormField label="Location ID" value={form.DeliveryAddressLocationId} onChangeText={text => handleChange('DeliveryAddressLocationId', text)} />
//             <FormField label="State ID" value={form.DeliveryAddressStateId} onChangeText={text => handleChange('DeliveryAddressStateId', text)} />
//             <FormField label="Delivery Name" value={form.DeliveryAddressName} onChangeText={text => handleChange('DeliveryAddressName', text)} />
//             <FormField label="Receiving Site ID" value={form.ReceivingSiteId} onChangeText={text => handleChange('ReceivingSiteId', text)} />
//             <FormField label="Warehouse ID" value={form.ReceivingWarehouseId} onChangeText={text => handleChange('ReceivingWarehouseId', text)} />
//           </View>
//         </ScrollView>

//         <View style={styles.bottomContainer}>
//           {lineCreated ? (
//             <>
//               <Pressable style={styles.nextButton} onPress={handleAddMoreLine}>
//                 <Text style={styles.nextButtonText}>Add More Line</Text>
//               </Pressable>
//               <Pressable style={[styles.nextButton, { backgroundColor: '#22c55e', marginTop: 12 }]} onPress={handleGoHome}>
//                 <Text style={styles.nextButtonText}>Go to Home</Text>
//               </Pressable>
//             </>
//           ) : (
//             <Pressable style={styles.nextButton} onPress={handleSubmit}>
//               <Text style={styles.nextButtonText}>Submit Line</Text>
//             </Pressable>
//           )}
//         </View>
//       </KeyboardAvoidingView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   // ... same styles as before ...
//   container: {
//     flex: 1,
//     backgroundColor: colors.primary,
//   },
//   keyboardView: { flex: 1 },
//   scrollView: { flex: 1 },
//   scrollContent: { paddingBottom: 100 },
//   header: {
//     paddingTop: Platform.OS === 'ios' ? 80 : 50,
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//     backgroundColor: colors.primary,
//   },
//   headerTextContainer: { marginTop: 20 },
//   heading: {
//     fontSize: 28,
//     fontFamily: 'Poppins_600SemiBold',
//     color: colors.text,
//     marginBottom: 4,
//   },
//   subheading: {
//     fontSize: 16,
//     fontFamily: 'Poppins_400Regular',
//     color: colors.text,
//     opacity: 0.7,
//   },
//   formContainer: {
//     backgroundColor: '#f8f9fa',
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//     paddingTop: 24,
//     paddingHorizontal: 20,
//     marginTop: 10,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontFamily: 'Poppins_600SemiBold',
//     color: '#1a1a1a',
//     marginBottom: 16,
//     paddingLeft: 4,
//   },
//   bottomContainer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: '#ffffff',
//     paddingHorizontal: 20,
//     paddingTop: 16,
//     paddingBottom: Platform.OS === 'ios' ? 34 : 20,
//     borderTopWidth: 1,
//     borderTopColor: '#f3f4f6',
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 10,
//   },
//   nextButton: {
//     backgroundColor: '#2563eb',
//     paddingVertical: 18,
//     borderRadius: 16,
//     alignItems: 'center',
//     justifyContent: 'center',
//     minHeight: 56,
//     shadowColor: '#2563eb',
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 8,
//   },
//   nextButtonText: {
//     color: '#ffffff',
//     fontSize: 17,
//     fontFamily: 'Poppins_600SemiBold',
//     letterSpacing: 0.5,
//   },
// });
