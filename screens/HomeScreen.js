import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  Linking,
  Switch,
  FlatList,
  TextInput,
  ActivityIndicator,
  ImageBackground
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import ReservarScreen from "./ReservarScreen";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [darkMode, setDarkMode] = useState(true);
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleHiddenLogin = () => {
    Alert.alert("Modo Admin", "Login oculto activado.");
    navigation.navigate("loggin");
  };

  const toggleTheme = () => setDarkMode(!darkMode);

  const agregarComentario = () => {
    if (nuevoComentario.trim() !== "") {
      setComentarios((prev) => [...prev, nuevoComentario]);
      setNuevoComentario("");
    }
  };

  const obtenerPromos = async () => {
    try {
      const response = await axios.get(
        "http://apiswagger.somee.com/api/ofertas"
      );
      setPromos(response.data);
    } catch (error) {
      console.error("Error al cargar las promociones", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerPromos();
  }, []);

  const colors = {
    background: darkMode ? "#1c1c1c" : "#f5f5f5",
    text: darkMode ? "#fff" : "#000",
    card: darkMode ? "#2a2a2a" : "#e0e0e0",
    secondary: "#FFD700"
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.scrollViewContainer}
    >
      <TouchableOpacity onLongPress={handleHiddenLogin}>
        <Text style={[styles.subtext, { color: colors.secondary }]}>
          ¡Bienvenido a Biergatten!
        </Text>
      </TouchableOpacity>

      <Image
        source={require("../photo/logo.webp")}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.socialRow}>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://facebook.com")}
        >
          {" "}
          <Icon name="facebook" size={30} color="#3b5998" />{" "}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://instagram.com")}
        >
          {" "}
          <Icon name="instagram" size={30} color="#C13584" />{" "}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://wa.me/51999999999")}
        >
          {" "}
          <Icon name="whatsapp" size={30} color="#25D366" />{" "}
        </TouchableOpacity>
      </View>

      <View style={styles.switchRow}>
        <Text style={{ color: colors.text }}>Modo Oscuro</Text>
        <Switch value={darkMode} onValueChange={toggleTheme} />
      </View>

      <View style={styles.gallery}>
        <Image
          source={require("../photo/Central.webp")}
          style={styles.imageItem}
        />
        <Image
          source={require("../photo/Bares.webp")}
          style={styles.imageItem}
        />
        <Image
          source={require("../photo/Trago.png")}
          style={styles.imageItem}
        />
      </View>

      <View style={styles.quickAccess}>
        <TouchableOpacity
          style={[styles.card, { backgroundColor: colors.card }]}
          onPress={() => navigation.navigate("CartaScreen")}
        >
          <Icon name="beer" size={30} color={colors.secondary} />
          <Text style={[styles.cardText, { color: colors.text }]}>
            Ver carta
          </Text>
        </TouchableOpacity>

        {/* Botón de Reservar */}
        <TouchableOpacity
          style={[styles.card, { backgroundColor: colors.card }]}
          onPress={() => navigation.navigate("ReservarScreen")}
        >
          <Icon name="calendar-clock" size={30} color={colors.secondary} />
          <Text style={[styles.cardText, { color: colors.text }]}>
            Reservar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: colors.card }]}
          onPress={() => navigation.navigate("promos")}
        >
          <Icon name="star" size={30} color={colors.secondary} />
          <Text style={[styles.cardText, { color: colors.text }]}>Promos</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.commentSection}>
        <Text style={[styles.commentTitle, { color: colors.text }]}>
          Comentarios y Valoraciones
        </Text>
        <TextInput
          style={[
            styles.commentBox,
            { color: colors.text, backgroundColor: colors.card }
          ]}
          placeholder="Deja tu comentario"
          placeholderTextColor="#999"
          value={nuevoComentario}
          onChangeText={setNuevoComentario}
        />
        <TouchableOpacity style={styles.saveButton} onPress={agregarComentario}>
          <Text style={styles.saveButtonText}>Enviar</Text>
        </TouchableOpacity>

        <FlatList
          data={comentarios}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text style={[styles.commentItem, { color: colors.text }]}>
              - {item}
            </Text>
          )}
        />
      </View>

      <Text style={[styles.commentTitle, { color: colors.text }]}>
        📢 Promociones de Carta
      </Text>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={colors.secondary}
          style={{ marginTop: 10 }}
        />
      ) : (
        promos.map((item, index) => (
          <View
            key={index}
            style={[styles.card, { backgroundColor: colors.card }]}
          >
            <Text style={[styles.nombre, { color: colors.secondary }]}>
              {item.nombre}
            </Text>
            <Text style={[styles.descripcion, { color: colors.text }]}>
              <Icon name="text" size={16} color="#ccc" /> {item.descripcion}
            </Text>
            <Text style={[styles.descuento, { color: colors.secondary }]}>
              <Icon name="sale" size={18} /> {item.descuento}% OFF
            </Text>
            <Text style={[styles.fechas, { color: "#aaa" }]}>
              <Icon name="calendar-range" size={16} /> Desde{" "}
              {new Date(item.fechaInicio).toLocaleDateString()} hasta{" "}
              {new Date(item.fechaFin).toLocaleDateString()}
            </Text>
          </View>
        ))
      )}

      {/* Botón de regreso al inicio */}
      <TouchableOpacity
        style={styles.goHomeButton}
        onPress={() => navigation.navigate("Inicio")}
      >
        <Text style={styles.goHomeButtonText}>Regresar al inicio</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 30
  },
  subtext: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold"
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 10,
    alignSelf: "center"
  },
  gallery: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    flexWrap: "wrap",
    gap: 10
  },
  imageItem: {
    width: 90,
    height: 90,
    borderRadius: 12
  },
  quickAccess: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10
  },
  card: {
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    width: "100%",
    marginBottom: 12
  },
  cardText: {
    marginTop: 10,
    fontSize: 12,
    textAlign: "center"
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginVertical: 10
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginBottom: 20
  },
  commentSection: {
    width: "100%",
    marginTop: 30
  },
  commentTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10
  },
  commentBox: {
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    marginBottom: 10
  },
  saveButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20
  },
  saveButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16
  },
  commentItem: {
    fontSize: 14,
    marginBottom: 6
  },
  nombre: {
    fontSize: 18,
    fontWeight: "bold"
  },
  descripcion: {
    fontSize: 14,
    marginBottom: 6
  },
  descuento: {
    fontSize: 14,
    marginBottom: 4
  },
  fechas: {
    fontSize: 12,
    fontStyle: "italic"
  },
  goHomeButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20
  },
  goHomeButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16
  }
});

export default HomeScreen;
