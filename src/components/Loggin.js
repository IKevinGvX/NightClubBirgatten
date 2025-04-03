import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  ImageBackground,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts, Lobster_400Regular } from "@expo-google-fonts/lobster";
import styles from "./styles";

const Loggin = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  const [fontsLoaded] = useFonts({ Lobster_400Regular });

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  if (!fontsLoaded) return null;

  const handleLogin = () => {
    const demoEmail = "demo@biergatten.com";
    const demoPassword = "123456";

    if (!email || !password) {
      alert("Por favor, completa todos los campos.");
    } else if (!email.includes("@")) {
      alert("Por favor, ingresa un correo válido.");
    } else if (email === demoEmail && password === demoPassword) {
      onLogin?.(email, password);
    } else {
      alert("Credenciales inválidas. Usa demo@biergatten.com / 123456");
    }
  };

  return (
    <ImageBackground
      source={require("../../photo/Session.webp")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.container,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Animated.Text
            style={[
              styles.title,
              {
                transform: [{ scale: scaleAnim }],
                fontFamily: "Lobster_400Regular",
              },
            ]}
          >
            Biergatten
          </Animated.Text>

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="email-outline"
              size={22}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Correo electrónico"
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="lock-outline"
              size={22}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Contraseña"
              placeholderTextColor="#aaa"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ImageBackground>
  );
};

export default Loggin;


