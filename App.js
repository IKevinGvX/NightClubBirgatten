import React, { useState, useEffect } from "react";
import { View, Button } from "react-native";
import * as Notifications from "expo-notifications";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Inicio from "./src/components/Inicio";
import Loggin from "./src/components/Loggin";
import Principal from "./src/components/Principal";
import MenuScreen from "./screens/MenuScreen";
import CreateBebida from "./screens/CreateBebida";
import styles from "./src/components/styles";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [screen, setScreen] = useState("inicio");
  const [expoPushToken, setExpoPushToken] = useState("");

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    Notifications.addNotificationReceivedListener(notification => {
      console.log("Notificación recibida: ", notification);
    });

    Notifications.addNotificationResponseReceivedListener(response => {
      console.log("Respuesta a la notificación: ", response);
    });
  }, []);

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

  const handleLogin = (email, password) => {
    console.log("Iniciando sesión con:", email, password);
    setUser(email);
    setScreen("principal");
    sendPushNotification();
  };

  const sendPushNotification = async () => {
    if (expoPushToken) {
      const message = {
        to: expoPushToken,
        sound: "default",
        title: "¡Bienvenido!",
        body: "Has iniciado sesión correctamente.",
        data: { data: "Más detalles de la sesión" },
      };

      await Notifications.scheduleNotificationAsync({
        content: message,
        trigger: { seconds: 2 },
      });
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Root Screen usando estados internos */}
        <Stack.Screen name="Root">
          {() => (
            <View style={styles.container}>
              {screen === "inicio" && <Inicio onStart={() => setScreen("loggin")} />}
              {screen === "loggin" && <Loggin onLogin={handleLogin} />}
              {screen === "principal" && user && <Principal user={user} />}
              <Button title="Enviar Notificación de prueba" onPress={sendPushNotification} />
            </View>
          )}
        </Stack.Screen>

        {/* Accesos adicionales desde MenuScreen */}
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="CreateBebida" component={CreateBebida} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
