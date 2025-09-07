import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const ViewPOLinesContext = createContext();

export const usePOLines = () => useContext(ViewPOLinesContext);

export const ViewPOLinesProvider = ({ children }) => {
  const [poLines, setPoLines] = useState([]);
  const [loadingLines, setLoadingLines] = useState(false);
  const [linesError, setLinesError] = useState(null);

  const fetchPOLines = async (poNumber) => {
    setLoadingLines(true);
    setLinesError(null);
    try {
      const baseURL = process.env.EXPO_PUBLIC_BASE_URL || 'https://6f1b0e508cce.ngrok-free.app';
      const response = await axios.get(`${baseURL}/api/po/lines/${poNumber}`);
      if (response.status === 200) {
        setPoLines(response.data?.data || []);
      } else {
        setLinesError("Unexpected response status");
      }
    } catch (err) {
      setLinesError("Failed to fetch PO lines");
      console.error("Error fetching PO lines:", err);
    } finally {
      setLoadingLines(false);
    }
  };

  return (
    <ViewPOLinesContext.Provider value={{ poLines, loadingLines, linesError, fetchPOLines }}>
      {children}
    </ViewPOLinesContext.Provider>
  );
};
