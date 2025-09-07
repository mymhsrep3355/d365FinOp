import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import colors from '../contants/colors';
import BackButton from '../components/BackButton';

export default function PurchaseOrderDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { po } = route.params;

  const renderField = (label, value) => (
    <View style={styles.fieldRow} key={label}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value || '—'}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <BackButton />
      <View style={styles.container}>
        <Text style={styles.title}>Purchase Order Details</Text>

        <ScrollView contentContainerStyle={styles.content}>
          {renderField('PO Number', po?.PurchaseOrderNumber)}
          {renderField('Vendor Account', po?.OrderVendorAccountNumber)}
          {renderField('Delivery Address', po?.DeliveryAddressDescription)}
          {renderField('Street', po?.InvoiceAddressStreet)}
          {renderField('Currency', po?.CurrencyCode)}
          {renderField('Delivery Mode', po?.DeliveryModeId)}
          {renderField('Invoice Type', po?.InvoiceType)}
          {renderField('Invoice Account', po?.InvoiceVendorAccountNumber)}
          {renderField('Delivery Date', po?.RequestedDeliveryDate)}
          {renderField('Status', po?.DocumentStatus)}
          {renderField('Email', po?.Email)}
        </ScrollView>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.outlineButton]}
            onPress={() => navigation.navigate('HomeTabs')}
          >
            <Text style={[styles.buttonText, styles.outlineText]}>Back to Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('PurchaseOrderLinesScreen', {
                poNumber: po?.PurchaseOrderNumber,
              })
            }
          >
            <Text style={styles.buttonText}>View Lines</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingLeft: 15,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.text,
    marginTop: 12,
    marginBottom: 20,
  },
  content: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 20,
    paddingBottom: 100,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
  },
  fieldRow: {
    marginBottom: 18,
  },
  label: {
    fontSize: 13,
    fontFamily: 'Poppins_600SemiBold',
    color: '#666',
    marginBottom: 4,
  },
  value: {
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
    color: '#111',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 16,
    marginBottom: Platform.OS === 'ios' ? 30 : 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2563eb',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  outlineButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#2563eb',
  },
  buttonText: {
    fontSize: 15,
    fontFamily: 'Poppins_600SemiBold',
    color: '#ffffff',
  },
  outlineText: {
    color: '#2563eb',
  },
});
