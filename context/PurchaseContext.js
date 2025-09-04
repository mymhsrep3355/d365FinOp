import React, {createContext, useContext, useState} from "react";

const PurchaseContext = createContext();
export const usePurchase = () => useContext(PurchaseContext);

export const PurchaseProvider = ({children}) => {
    const [purchaseData, setPurchaseData] = useState({
        step1: {},
        step2: {},
    });

    const updateStep1 = (data) => {
        setPurchaseData((prev) => ({...prev, step1: data}));
    }
    const updateStep2 = (data) => {
        setPurchaseData((prev) => ({...prev, step2: data}));
    }
    const resetPurchase = () => {
        setPurchaseData({step1: {}, step2: {}});
    }
    return (
        <PurchaseContext.Provider value={{purchaseData, updateStep1, updateStep2, resetPurchase}}>
            {children}
        </PurchaseContext.Provider>
    );
}
