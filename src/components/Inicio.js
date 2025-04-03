import React from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import styles from "./styles";

const Inicio = ({ onStart }) => {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../photo/Session.webp")}
        style={styles.fullScreenBackground}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Bienvenido a Biergatten 🍺</Text>
          <Text style={styles.subtitle}>Tu bar favorito, ahora en tu bolsillo</Text>

          <TouchableOpacity style={styles.button} onPress={onStart}>
            <Text style={styles.buttonText}>Comenzar</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <View style={{ flex: 0.2, backgroundColor: "#00000088", justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 12 }}>© 2025 Biergatten Bar App</Text>
      </View>
    </View>
  );
};

export default Inicio;
