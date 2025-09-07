import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { usePOLines } from "../context/ViewPOLinesContext";
import BackButton from "../components/BackButton";
import PoLineCard from "../components/PoLineCard"; 

const ViewPOLinesScreen = ({ route }) => {
  const { poNumber } = route.params;
  const { poLines, fetchPOLines, loadingLines, linesError } = usePOLines();

  useEffect(() => {
    if (poNumber) fetchPOLines(poNumber);
  }, [poNumber]);

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <Text style={styles.title}>Purchase Order #{poNumber}</Text>

      {loadingLines && (
        <ActivityIndicator size="large" color="#2d00a9" style={{ marginTop: 40 }} />
      )}
      {linesError && <Text style={styles.error}>{linesError}</Text>}

      <FlatList
        data={poLines}
        keyExtractor={(item, index) => `${item.PurchaseOrderNumber}-${item.LineNumber}-${index}`}
        renderItem={({ item }) => <PoLineCard line={item} />}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          !loadingLines && (
            <Text style={styles.empty}>No Purchase Order Lines found.</Text>
          )
        }
      />
    </SafeAreaView>
  );
};

export default ViewPOLinesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f8fa",
  },
  title: {
    fontSize: 22,
    fontFamily: "Poppins_600SemiBold",
    color: "#1f2937",
    marginHorizontal: 16,
    marginTop: 55,
    marginBottom: 10,
  },
  error: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    marginTop: 10,
  },
  listContent: {
    padding: 16,
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#999",
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
});
