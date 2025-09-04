import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
} from 'react-native';
import BackButton from '../components/BackButton';
import FormField from '../components/FormField';
import colors from '../contants/colors';
import { useNavigation } from '@react-navigation/native';
import { usePurchase } from '../context/PurchaseContext';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

export default function CreatePOStep2Screen() {
    const navigation = useNavigation();
    const { purchaseData, updateStep2, resetPurchase } = usePurchase();
    const [deliveryAddressCity, setDeliveryAddressCity] = useState('');
    const [deliveryAddressCountyId, setDeliveryAddressCountyId]  = useState('');
    const [deliveryAddressZipCode, setDeliveryAddressZipCode] =   useState(''); 
    const [deliveryAddressLocationId, setDeliveryAddressLocationId] = useState('');
    const [deliveryAddressStreet, setDeliveryAddressStreet] = useState('');

    const [defaultReceivingSiteId, setDefaultReceivingSiteId] = useState('');
    const [formattedDeliveryAddress, setFormattedDeliveryAddress] = useState('');

    const handleNext = async () => {
        updateStep2({
            deliveryAddressCity,
            deliveryAddressCountyId,
            deliveryAddressZipCode,
            deliveryAddressLocationId,
            deliveryAddressStreet,
            defaultReceivingSiteId,
            formattedDeliveryAddress,
        });

        const completeData = {
            ...purchaseData.step1,
            deliveryAddressCity,
            deliveryAddressCountyId,
            deliveryAddressZipCode,
            deliveryAddressLocationId,
            deliveryAddressStreet,
            defaultReceivingSiteId,
            formattedDeliveryAddress,
        };

        console.log('Complete Purchase Order Data:', completeData);
        try {
            const res =  await axios.post(`http://172.20.6.30:5000/api/po/create`, completeData);
            if(res.status === 200){
                resetPurchase();
                navigation.navigate('POSuccess');
            }
            console.log('PO submission response:', res.data);
        } catch (error) {
            console.log('Error submitting PO:', error);
        }
       
    };

    const isFormValid = () => {
        return orderVendorAccountNumber.trim() &&
            purchaseOrderName.trim() &&
            requestedDeliveryDate;
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
                            <Text style={styles.heading}>Create Purchase Order</Text>
                            <Text style={styles.subheading}>Step 1 of 2</Text>
                        </View>
                    </View>

                    <View style={styles.formContainer}>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Delivery Address</Text>
                            <FormField
                                label="Street Address"
                                value={deliveryAddressStreet}
                                onChangeText={setDeliveryAddressStreet}
                                placeholder="e.g. 213 South Street, Gate 1"
                            />

                            <View style={styles.row}>
                                <View style={styles.halfField}>
                                    <FormField
                                        label="City"
                                        value={deliveryAddressCity}
                                        onChangeText={setDeliveryAddressCity}
                                        placeholder="e.g. Galvin"
                                    />
                                </View>
                                <View style={styles.halfField}>
                                    <FormField
                                        label="Zip Code"
                                        value={deliveryAddressZipCode}
                                        onChangeText={setDeliveryAddressZipCode}
                                        placeholder="e.g. 98544"
                                    />
                                </View>
                            </View>

                            <FormField
                                label="County ID"
                                value={deliveryAddressCountyId}
                                onChangeText={setDeliveryAddressCountyId}
                                placeholder="e.g. ASOTIN"
                            />

                            <FormField
                                label="Location ID"
                                value={deliveryAddressLocationId}
                                onChangeText={setDeliveryAddressLocationId}
                                placeholder="e.g. 000001098"
                            />

                            <FormField
                                label="Receiving Site ID"
                                value={defaultReceivingSiteId}
                                onChangeText={setDefaultReceivingSiteId}
                                placeholder="e.g. 1"
                            />

                            <FormField
                                label="Formatted Delivery Address"
                                value={formattedDeliveryAddress}
                                onChangeText={setFormattedDeliveryAddress}
                                placeholder="Complete formatted address"
                                multiline
                                numberOfLines={3}
                            />
                        </View>
                    </View>
                </ScrollView>

                <View style={styles.bottomContainer}>
                    <Pressable style={styles.nextButton} onPress={handleNext}>
                        <Text style={styles.nextButtonText}>Next</Text>
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
        minHeight: height * 0.7,
        marginTop: 10,
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: 'Poppins_600SemiBold',
        color: '#1a1a1a',
        marginBottom: 16,
        paddingLeft: 4,
    },
    fieldContainer: {
        marginBottom: 20,
    },
    fieldLabel: {
        fontSize: 14,
        fontFamily: 'Poppins_500Medium',
        color: '#374151',
        marginBottom: 8,
        paddingLeft: 4,
    },
    required: {
        color: '#ef4444',
    },
    dateInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1.5,
        borderColor: '#e5e7eb',
        borderRadius: 16,
        padding: 16,
        backgroundColor: '#ffffff',
        minHeight: 56,
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    dateText: {
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        color: '#1f2937',
    },
    placeholderText: {
        color: '#9ca3af',
    },
    dateIcon: {
        fontSize: 20,
        opacity: 0.6,
    },
    row: {
        flexDirection: 'row',
        gap: 12,
    },
    halfField: {
        flex: 1,
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
        shadowOffset: { width: 0, height: -2 },
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
        shadowOffset: { width: 0, height: 4 },
        elevation: 8,
    },
    nextButtonDisabled: {
        backgroundColor: '#d1d5db',
        shadowOpacity: 0,
        elevation: 0,
    },
    nextButtonText: {
        color: '#ffffff',
        fontSize: 17,
        fontFamily: 'Poppins_600SemiBold',
        letterSpacing: 0.5,
    },
    nextButtonTextDisabled: {
        color: '#9ca3af',
    },
});