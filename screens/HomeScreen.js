import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView, // Agregar el ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const HomeScreen = ({ navigateTo }) => {
  // Manejamos la lógica para ocultar el login en el admin
  const handleHiddenLogin = () => {
    Alert.alert("Modo Admin", "Login oculto activado.");
    navigateTo?.("loggin");
  };

  return (
    <View style={styles.container}>
      {/* Elimina el saludo y el usuario, solo se mantiene el logo y botones de acceso rápido */}
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <TouchableOpacity onLongPress={handleHiddenLogin}>
          <Text style={styles.subtext}>¡Bienvenido a Biergatten!</Text>
        </TouchableOpacity>

        <Image
          source={require("../photo/logo.webp")}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.quickAccess}>
          <TouchableOpacity style={styles.card} onPress={() => navigateTo("carta")}>
            <Icon name="beer" size={30} color="#FFD700" />
            <Text style={styles.cardText}>Ver carta</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigateTo("reservar")}>
            <Icon name="calendar-clock" size={30} color="#FFD700" />
            <Text style={styles.cardText}>Reservar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigateTo("promos")}>
            <Icon name="star" size={30} color="#FFD700" />
            <Text style={styles.cardText}>Promos</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  subtext: {
    fontSize: 20,
    color: "#FFD700",
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 10,
  },
  quickAccess: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
  },
  card: {
    backgroundColor: "#2a2a2a",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    width: 90,
    elevation: 4,
  },
  cardText: {
    marginTop: 10,
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 30, // Para permitir espacio de desplazamiento
  },
});

export default HomeScreen;

