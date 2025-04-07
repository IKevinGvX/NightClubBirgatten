import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Linking
} from "react-native";
import styles from "./styles";

const Inicio = ({ onStart, navigation }) => {
  const handleVisitPage = () => {
    // Redirigir al sitio web proporcionado
    Linking.openURL("https://carnavalbar.mesa247.pe/").catch((err) =>
      console.error("Error al abrir la página: ", err)
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../photo/Session.webp")}
        style={styles.fullScreenBackground}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Bienvenido a Biergatten 🍺</Text>
          <Text style={styles.subtitle}>
            Tu bar favorito, ahora en tu bolsillo
          </Text>

          {/* Button to start */}
          <TouchableOpacity style={styles.button} onPress={onStart}>
            <Text style={styles.buttonText}>Comenzar</Text>
          </TouchableOpacity>

          {/* Button to visit the page */}
          <TouchableOpacity style={styles.button} onPress={handleVisitPage}>
            <Text style={styles.buttonText}>Visitar Página</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <View
        style={{
          flex: 0.2,
          backgroundColor: "#00000088",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text style={{ color: "#fff", fontSize: 12 }}>
          © 2025 Biergatten Bar App
        </Text>
      </View>
    </View>
  );
};

export default Inicio;
