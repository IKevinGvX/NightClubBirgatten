import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ReservarScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📆 Reservas</Text>
      <Text style={styles.text}>Aquí podrás hacer tu reserva para disfrutar con nosotros.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    color: "#FFD700",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    color: "#ccc",
    fontSize: 16,
    textAlign: "center",
  },
});

export default ReservarScreen;
