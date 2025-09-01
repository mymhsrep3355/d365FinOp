import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Pressable,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import BackButton from '../components/BackButton';
import colors from '../contants/colors';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function CreatePOStep1Screen() {
    const navigation = useNavigation();

    const [vendorName, setVendorName] = useState('');
    const [orderDate, setOrderDate] = useState('');
    const [reference, setReference] = useState('');
    const [contactName, setContactName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [notes, setNotes] = useState('');

    const [showOrderDatePicker, setShowOrderDatePicker] = useState(false);
    const [showDeliveryDatePicker, setShowDeliveryDatePicker] = useState(false);

    const handleNext = () => {
        navigation.navigate('PO1', {
            vendorName,
            orderDate,
            reference,
            contactName,
            contactEmail,
            deliveryDate,
            deliveryAddress,
            notes,
        });
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView contentContainerStyle={styles.inner}>
                <BackButton />

                <Text style={styles.heading}>Create Purchase Order - Step 1</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Vendor Name"
                    value={vendorName}
                    onChangeText={setVendorName}
                    placeholderTextColor="#888"
                />

                {/* Order Date */}
                <Pressable onPress={() => setShowOrderDatePicker(true)}>
                    <View style={styles.dateInput}>
                        <Text style={{ color: orderDate ? colors.text : '#888' }}>
                            {orderDate ? moment(orderDate).format('YYYY-MM-DD') : 'Select Order Date'}
                        </Text>
                    </View>
                </Pressable>
                {showOrderDatePicker && (
                    <DateTimePicker
                        value={orderDate ? new Date(orderDate) : new Date()}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                            setShowOrderDatePicker(false);
                            if (selectedDate) {
                                setOrderDate(moment(selectedDate).format('YYYY-MM-DD'));
                            }
                        }}
                    />
                )}

                <TextInput
                    style={styles.input}
                    placeholder="Reference Number"
                    value={reference}
                    onChangeText={setReference}
                    placeholderTextColor="#888"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Contact Name"
                    value={contactName}
                    onChangeText={setContactName}
                    placeholderTextColor="#888"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Contact Email"
                    value={contactEmail}
                    onChangeText={setContactEmail}
                    placeholderTextColor="#888"
                    keyboardType="email-address"
                />

                {/* Delivery Date */}
                <Pressable onPress={() => setShowDeliveryDatePicker(true)}>
                    <View style={styles.dateInput}>
                        <Text style={{ color: deliveryDate ? colors.text : '#888' }}>
                            {deliveryDate ? moment(deliveryDate).format('YYYY-MM-DD') : 'Select Delivery Date'}
                        </Text>
                    </View>
                </Pressable>
                {showDeliveryDatePicker && (
                    <DateTimePicker
                        value={deliveryDate ? new Date(deliveryDate) : new Date()}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                            setShowDeliveryDatePicker(false);
                            if (selectedDate) {
                                setDeliveryDate(moment(selectedDate).format('YYYY-MM-DD'));
                            }
                        }}
                    />
                )}

                <TextInput
                    style={styles.input}
                    placeholder="Delivery Address"
                    value={deliveryAddress}
                    onChangeText={setDeliveryAddress}
                    placeholderTextColor="#888"
                />

                <TextInput
                    style={[styles.input, { height: 100 }]}
                    placeholder="Additional Notes"
                    value={notes}
                    onChangeText={setNotes}
                    multiline
                    placeholderTextColor="#888"
                />

                <Pressable style={styles.nextButton} onPress={handleNext}>
                    <Text style={styles.nextButtonText}>Next</Text>
                </Pressable>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
    },
    inner: {
        paddingTop: 100,
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    heading: {
        fontSize: 22,
        fontFamily: 'Poppins_600SemiBold',
        marginBottom: 30,
        color: colors.text,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 12,
        padding: 14,
        marginBottom: 20,
        backgroundColor: '#fff',
        color: colors.text,
        fontSize: 16,
    },
    dateInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 12,
        padding: 14,
        marginBottom: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        height: 50,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    nextButton: {
        marginTop: 10,
        backgroundColor: '#2d00a9',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
    },
});
