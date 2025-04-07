import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ImageBackground,
  TextInput,
  TouchableOpacity
} from "react-native";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CartaScreen = () => {
  const navigation = useNavigation(); // Usamos useNavigation para la navegación
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [filteredPromos, setFilteredPromos] = useState([]);

  useEffect(() => {
    obtenerPromos();
  }, []);

  const obtenerPromos = async () => {
    try {
      const response = await axios.get(
        "http://apiswagger.somee.com/api/ofertas"
      );
      setPromos(response.data);
      setFilteredPromos(response.data); // Initially, show all promos
    } catch (error) {
      console.error("Error al cargar las promociones", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = promos.filter(
      (promo) =>
        promo.nombre.toLowerCase().includes(text.toLowerCase()) ||
        promo.descripcion.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredPromos(filtered);
  };

  const handleGoHome = () => {
    navigation.navigate("Root"); // Regresar a la pantalla de inicio
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.nombre}>{item.nombre}</Text>
      <Text style={styles.descripcion}>
        <MaterialCommunityIcons name="text" size={16} color="#ccc" />{" "}
        {item.descripcion}
      </Text>
      <Text style={styles.descuento}>
        <MaterialCommunityIcons name="sale" size={18} color="#FFD700" />{" "}
        {item.descuento}% OFF
      </Text>
      <Text style={styles.fechas}>
        <MaterialCommunityIcons name="calendar-range" size={16} color="#aaa" />{" "}
        Desde {new Date(item.fechaInicio).toLocaleDateString()} hasta{" "}
        {new Date(item.fechaFin).toLocaleDateString()}
      </Text>
    </View>
  );

  return (
    <ImageBackground
      source={require("../photo/Trago.png")}
      style={styles.background}
      blurRadius={3}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>🍹 Promociones Exclusivas</Text>

        {/* Barra de búsqueda */}
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar promoción"
          placeholderTextColor="#ccc"
          value={searchText}
          onChangeText={handleSearch}
        />

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#FFD700"
            style={{ marginTop: 30 }}
          />
        ) : (
          <FlatList
            data={filteredPromos}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        )}

        {/* Botón de regreso al inicio */}
        <TouchableOpacity style={styles.goHomeButton} onPress={handleGoHome}>
          <Text style={styles.goHomeButtonText}>Regresar al inicio</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.85)", padding: 16 },
  title: {
    fontSize: 26,
    color: "#FFD700",
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center"
  },
  searchInput: {
    backgroundColor: "#2a2a2a",
    padding: 10,
    borderRadius: 12,
    marginBottom: 20,
    color: "#fff",
    fontSize: 16,
    marginTop: 20
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
  nombre: {
    color: "#FFD700",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 6
  },
  descripcion: { color: "#ccc", fontSize: 15, marginBottom: 6 },
  descuento: {
    color: "#FFD700",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4
  },
  fechas: { color: "#aaa", fontSize: 13, fontStyle: "italic" },
  goHomeButton: {
    backgroundColor: "#FFD700",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20
  },
  goHomeButtonText: { color: "#000", fontWeight: "bold" }
});

export default CartaScreen;
