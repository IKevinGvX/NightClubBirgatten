import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PromosScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 Promociones</Text>
      <Text style={styles.text}>¡Descubre nuestras ofertas y promociones especiales!</Text>
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

export default PromosScreen;
