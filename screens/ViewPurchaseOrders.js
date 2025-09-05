import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
} from 'react-native';

import PurchaseOrderCard from '../components/PurchaseOrderCard';
import BackButton from '../components/BackButton';
import colors from '../contants/colors';
import { useGetPurchaseOrder } from '../context/GetPurchaseOrderContext';
import { Ionicons } from '@expo/vector-icons';

export default function ViewPurchaseOrders() {
  const {
    allPurchaseOrders,
    loading,
    filteredPurchaseOrders,
    fetchPurchaseOrders,
    filterByPONumber,
  } = useGetPurchaseOrder();

  const [search, setSearch] = useState('');

  useEffect(() => {
    if (search.trim() === '') {
      filterByPONumber('');
    }
  }, [search]);

  const handleSearch = () => {
    Keyboard.dismiss();
    filterByPONumber(search);
  };

  const clearSearch = () => {
    setSearch('');
    filterByPONumber('');
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No Purchase Orders found.</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <Text style={styles.title}>Purchase Orders</Text>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search by PO Number"
            style={styles.input}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearIcon}>
              <Ionicons name="close-circle" size={20} color="#aaa" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Ionicons name="search" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={fetchPurchaseOrders} style={styles.refreshButton}>
        <Text style={styles.refreshButtonText}>Get Latest Purchase Orders</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#2d00a9" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={filteredPurchaseOrders}
          keyExtractor={(item) => item.PurchaseOrderNumber}
          renderItem={({ item }) => <PurchaseOrderCard po={item} />}
          contentContainerStyle={{ padding: 16 }}
          ListEmptyComponent={renderEmpty}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  refreshButton: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#2d00a9',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  refreshButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
  },
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.text,
    marginHorizontal: 16,
    marginTop: 55,
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  searchInputWrapper: {
    flex: 1,
    position: 'relative',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    borderWidth: 1.2,
    borderColor: '#e5e7eb',
    paddingRight: 36, 
  },
  clearIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: '#2d00a9',
    padding: 10,
    borderRadius: 10,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
});
