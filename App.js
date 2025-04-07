import React, { useState, useEffect } from "react";
import { View } from "react-native";
import * as Notifications from "expo-notifications";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Inicio from "./src/components/Inicio";
import Loggin from "./src/components/Loggin";
import Principal from "./src/components/Principal";
import MenuScreen from "./screens/MenuScreen";
import CreateBebida from "./screens/CreateBebida";
import CartaScreen from "./screens/CartaScreen";
import styles from "./src/components/styles";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [screen, setScreen] = useState("inicio");
  const [expoPushToken, setExpoPushToken] = useState("");

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    Notifications.addNotificationReceivedListener((notification) => {
      console.log("Notificación recibida: ", notification);
    });

    Notifications.addNotificationResponseReceivedListener((response) => {
      console.log("Respuesta a la notificación: ", response);
    });
  }, []);

  // Función para registrar notificaciones push
  const registerForPushNotificationsAsync = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Permiso para notificaciones denegado");
      return;
    }

    const token = await Notifications.getExpoPushTokenAsync();
    console.log("Expo push token: ", token.data);
    return token.data;
  };

  // Manejo del inicio de sesión
  const handleLogin = (email, password) => {
    console.log("Iniciando sesión con:", email, password);
    setUser(email); // Aquí se podría hacer un manejo de usuario más complejo
    setScreen("principal");
    sendPushNotification(); // Enviar notificación al iniciar sesión
  };

  // Enviar notificación push
  const sendPushNotification = async () => {
    if (expoPushToken) {
      const message = {
        to: expoPushToken,
        sound: "default",
        title: "¡Bienvenido!",
        body: "Has iniciado sesión correctamente.",
        data: { data: "Más detalles de la sesión" }
      };

      // Programar la notificación para que se ejecute después de 2 segundos
      await Notifications.scheduleNotificationAsync({
        content: message,
        trigger: { seconds: 2 }
      });
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Pantalla raíz utilizando un solo componente condicional para manejar el flujo */}
        <Stack.Screen name="Root">
          {() => (
            <View style={styles.container}>
              {screen === "inicio" && (
                <Inicio onStart={() => setScreen("loggin")} />
              )}
              {screen === "loggin" && <Loggin onLogin={handleLogin} />}
              {screen === "principal" && user && <Principal user={user} />}
            </View>
          )}
        </Stack.Screen>

        {/* Navegación adicional */}
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="CreateBebida" component={CreateBebida} />
        <Stack.Screen name="CartaScreen" component={CartaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
