import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ImageBackground
} from "react-native";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ReservarScreen = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservas();
  }, []);

  const fetchReservas = async () => {
    try {
      const response = await axios.get(
        "http://apiswagger.somee.com/api/reservas"
      );
      setReservas(response.data);
    } catch (error) {
      console.error("Error al obtener reservas", error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.fecha}>
        <MaterialCommunityIcons
          name="calendar-clock"
          size={18}
          color="#FFD700"
        />{" "}
        {new Date(item.fechaReserva).toLocaleString()}
      </Text>
      <Text style={styles.personas}>
        <MaterialCommunityIcons name="account-group" size={16} color="#ccc" />{" "}
        {item.numeroPersonas} personas
      </Text>
      <Text style={styles.estado}>
        <MaterialCommunityIcons name="alert-circle" size={16} color="#ccc" />{" "}
        Estado: {item.estado}
      </Text>
    </View>
  );

  return (
    <ImageBackground
      source={require("../photo/Bares.webp")}
      style={styles.background}
      blurRadius={3}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>📅 Historial de Reservas</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#FFD700" />
        ) : (
          <FlatList
            data={reservas}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    padding: 16
  },
  title: {
    fontSize: 26,
    color: "#FFD700",
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center"
  },
  card: {
    backgroundColor: "#2a2a2a",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 6,
    shadowColor: "#FFD700",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10
  },
  fecha: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6
  },
  personas: {
    color: "#ccc",
    fontSize: 15,
    marginBottom: 4
  },
  estado: {
    color: "#aaa",
    fontSize: 14,
    fontStyle: "italic"
  }
});

export default ReservarScreen;
