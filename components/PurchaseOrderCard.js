import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Touchable, TouchableOpacity } from 'react-native';

const PurchaseOrderCard = ({ po }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.card}
      onPress={() => navigation.navigate('PODetails', { po })}
    >
      <Text style={styles.poNumber}>PO: {po.PurchaseOrderNumber}</Text>
      <Text style={styles.name}>{po.PurchaseOrderName || 'Unnamed Order'}</Text>
      <Text style={styles.detail}>Vendor: {po.OrderVendorAccountNumber}</Text>
      <Text style={styles.status}>Status: {po.PurchaseOrderStatus}</Text>
      <Text style={styles.date}>{po.AccountingDate?.split('T')[0]}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  poNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d00a9',
    marginBottom: 4,
  },
  name: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  detail: {
    fontSize: 13,
    color: '#6b7280',
  },
  status: {
    fontSize: 13,
    color: '#16a34a',
    marginTop: 6,
  },
  date: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 2,
  },
});

export default PurchaseOrderCard;
