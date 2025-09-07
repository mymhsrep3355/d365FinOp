import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";


const GetPurchaseOrderContext = createContext();
export const useGetPurchaseOrder = () => useContext(GetPurchaseOrderContext);

export const GetPurchaseOrderProvider = ({ children }) => {
    const [allPurchaseOrders, setAllPurchaseOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filteredPurchaseOrders, setFilteredPurchaseOrders] = useState([]);
    const url = process.env.EXPO_PUBLIC_BASE_URL;
    console.log('Base URL from env:', url);

    const fetchPurchaseOrders = async () => {
        setLoading(true);
        try {
            // const response = await axios.get(`${url}/api/po/list`);
            const response = await axios.get(`https://6f1b0e508cce.ngrok-free.app/api/po/list`);

            if (response.status === 200) {
                console.log('Fetched Purchase Orders:', response.data);
                setAllPurchaseOrders(response.data?.data || []);
                setFilteredPurchaseOrders(response.data?.data || []);
            }
        } catch (error) {
            console.error('Error fetching purchase orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterByPONumber = (searchTerm) => {
        if (!searchTerm.trim()) {
            setFilteredPurchaseOrders(allPurchaseOrders);
        } else {
            const filtered = allPurchaseOrders.filter((po) =>
                po.PurchaseOrderNumber.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredPurchaseOrders(filtered);
        }
    };
    useEffect(() => {
        fetchPurchaseOrders();
    }, []);
    return (
        <GetPurchaseOrderContext.Provider
            value={{
                allPurchaseOrders,
                loading,
                filteredPurchaseOrders,
                fetchPurchaseOrders,
                filterByPONumber
            }}
        >
            {children}
        </GetPurchaseOrderContext.Provider>
    );
}