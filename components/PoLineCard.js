import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PoLineCard = ({ line }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.lineNumber}>
        <Ionicons name="layers-outline" size={16} color="#2d00a9" /> Line #{line.LineNumber}
      </Text>

      <Text style={styles.label}>
        <Text style={styles.bold}>Item: </Text>
        {line.ItemNumber}
      </Text>

      {line.LineDescription ? (
        <Text style={styles.label}>
          <Text style={styles.bold}>Description: </Text>
          {line.LineDescription}
        </Text>
      ) : null}

      <Text style={styles.label}>
        <Text style={styles.bold}>Quantity: </Text>
        {line.OrderedPurchaseQuantity}
      </Text>

      <Text style={styles.label}>
        <Text style={styles.bold}>Unit Price: </Text>${line.PurchasePrice?.toFixed(2)}
      </Text>

      <Text style={styles.label}>
        <Text style={styles.bold}>Line Amount: </Text>${line.LineAmount?.toFixed(2)}
      </Text>

      <Text style={styles.label}>
        <Text style={styles.bold}>Warehouse: </Text>
        {line.ReceivingWarehouseId || "N/A"}
      </Text>
    </View>
  );
};

export default PoLineCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  lineNumber: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "#2d00a9",
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#374151",
    marginBottom: 4,
  },
  bold: {
    fontFamily: "Poppins_600SemiBold",
    color: "#111827",
  },
});
