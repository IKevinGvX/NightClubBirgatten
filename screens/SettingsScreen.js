import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SettingsScreen = () => {
  const handleLogout = () => {
    Alert.alert("Cerrar sesión", "¿Estás seguro de salir?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Salir", onPress: () => alert("Sesión cerrada.") },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚙️ Ajustes</Text>

      <View style={styles.section}>
        <TouchableOpacity style={styles.item}>
          <MaterialCommunityIcons name="account" size={24} color="#FFD700" />
          <Text style={styles.itemText}>Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <MaterialCommunityIcons name="lock" size={24} color="#FFD700" />
          <Text style={styles.itemText}>Cambiar contraseña</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <MaterialCommunityIcons name="email" size={24} color="#FFD700" />
          <Text style={styles.itemText}>Soporte</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <MaterialCommunityIcons name="logout" size={22} color="#000" />
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 26,
    color: "#FFD700",
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  section: {
    marginBottom: 40,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2a2a2a",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  itemText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 14,
  },
  logoutButton: {
    flexDirection: "row",
    backgroundColor: "#FFD700",
    padding: 14,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: "auto",
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});

export default SettingsScreen;
