import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import AwesomeAlert from "react-native-awesome-alerts";
import { useNavigation } from "@react-navigation/native";

const MenuScreen = () => {
  const navigation = useNavigation();
  const [bebidas, setBebidas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [product, setProduct] = useState({
    productoID: null,
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    categoria: "",
    estado: "activo",
    fechaIngreso: new Date()
  });
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const response = await axios.get(
        "http://apiswagger.somee.com/api/productos/list"
      );
      setBebidas(response.data);
    } catch (error) {
      setAlertMessage("No se pudo cargar la lista de productos.");
      setAlertVisible(true);
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
    if (text.trim() === "") {
      fetchProductos();
    } else {
      const filtered = bebidas.filter((item) =>
        item.nombre.toLowerCase().includes(text.toLowerCase())
      );
      setBebidas(filtered);
    }
  };

  const handleInputChange = (field, value) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
  };

  const abrirModal = (item) => {
    if (item) {
      setProduct({
        productoID: item.productoID,
        nombre: item.nombre,
        descripcion: item.descripcion,
        precio: item.precio.toString(),
        stock: item.stock.toString(),
        categoria: item.categoria,
        estado: item.estado,
        fechaIngreso: new Date(item.fechaIngreso)
      });
      setModalVisible(true);
    }
  };

  const updateProducto = async (id, updatedProduct) => {
    try {
      await axios.put(
        `http://apiswagger.somee.com/api/productos/update/${id}`,
        updatedProduct
      );
      fetchProductos();
      setAlertMessage("Producto actualizado correctamente.");
      setAlertVisible(true);
    } catch (error) {
      setAlertMessage("No se pudo actualizar el producto.");
      setAlertVisible(true);
    }
  };

  const guardarBebida = async () => {
    const {
      nombre,
      descripcion,
      precio,
      stock,
      categoria,
      estado,
      productoID,
      fechaIngreso
    } = product;

    if (!nombre || !descripcion || !precio || !categoria || !stock) {
      setAlertMessage("Completa todos los campos.");
      return setAlertVisible(true);
    }

    if (isNaN(parseFloat(precio)) || isNaN(parseInt(stock))) {
      setAlertMessage("Precio o stock inválido.");
      return setAlertVisible(true);
    }

    const updatedBebida = {
      nombre,
      descripcion,
      precio: parseFloat(precio),
      stock: parseInt(stock),
      categoria,
      estado,
      fechaIngreso: new Date(fechaIngreso).toISOString()
    };

    await updateProducto(productoID, updatedBebida);
    setModalVisible(false);
  };

  const deleteProducto = async (id) => {
    try {
      await axios.delete(
        `http://apiswagger.somee.com/api/productos/deleting/${id}`
      );
      setAlertMessage("Producto eliminado correctamente.");
      setAlertVisible(true);
      setBebidas(bebidas.filter((b) => b.productoID !== id));
    } catch (error) {
      setAlertMessage("No se pudo eliminar el producto.");
      setAlertVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="glass-mug-variant"
          size={35}
          color="#FFD700"
        />
        <Text style={styles.title}>Drink Menu</Text>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Buscar producto"
        placeholderTextColor="#aaa"
        value={searchText}
        onChangeText={handleSearch}
      />

      <FlatList
        data={bebidas}
        keyExtractor={(item) => item.productoID.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.nombre}>{item.nombre}</Text>
              <Text style={styles.precio}>S/. {item.precio}</Text>
              <Text style={styles.fechaIngreso}>
                Incorporado: {new Date(item.fechaIngreso).toLocaleDateString()}
              </Text>
              <Text style={styles.estado}>
                {item.estado === "activo" ? "Disponible" : "No disponible"}
              </Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => abrirModal(item)}>
                <MaterialCommunityIcons
                  name="pencil"
                  size={22}
                  color="#FFD700"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteProducto(item.productoID)}>
                <MaterialCommunityIcons
                  name="delete"
                  size={22}
                  color="#ff4444"
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("CreateBebida")}
      >
        <MaterialCommunityIcons name="plus" size={28} color="#000" />
      </TouchableOpacity>

      <Modal transparent visible={modalVisible} animationType="fade">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Editar Producto</Text>

              <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={product.nombre}
                onChangeText={(text) => handleInputChange("nombre", text)}
                placeholderTextColor="#aaa"
              />
              <TextInput
                style={styles.input}
                placeholder="Descripción"
                value={product.descripcion}
                onChangeText={(text) => handleInputChange("descripcion", text)}
                placeholderTextColor="#aaa"
              />
              <TextInput
                style={styles.input}
                placeholder="Precio"
                value={product.precio.toString()}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange("precio", text)}
                placeholderTextColor="#aaa"
              />
              <TextInput
                style={styles.input}
                placeholder="Stock"
                value={product.stock.toString()}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange("stock", text)}
                placeholderTextColor="#aaa"
              />
              <TextInput
                style={styles.input}
                placeholder="Categoría"
                value={product.categoria}
                onChangeText={(text) => handleInputChange("categoria", text)}
                placeholderTextColor="#aaa"
              />
              <TextInput
                style={styles.input}
                placeholder="Estado"
                value={product.estado}
                onChangeText={(text) => handleInputChange("estado", text)}
                placeholderTextColor="#aaa"
              />
              <TextInput
                style={styles.input}
                placeholder="Fecha de Ingreso"
                value={new Date(product.fechaIngreso).toLocaleString()}
                editable={false}
                placeholderTextColor="#aaa"
              />

              <TouchableOpacity
                style={styles.saveButton}
                onPress={guardarBebida}
              >
                <Text style={styles.saveButtonText}>Guardar Cambios</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <AwesomeAlert
        show={alertVisible}
        title="Aviso"
        message={alertMessage}
        closeOnTouchOutside={true}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor="#FFD700"
        onConfirmPressed={() => setAlertVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", paddingHorizontal: 16 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    gap: 10
  },
  title: {
    fontSize: 26,
    color: "#FFD700",
    fontWeight: "bold",
    textAlign: "center"
  },
  searchInput: {
    backgroundColor: "#2a2a2a",
    borderRadius: 12,
    padding: 12,
    color: "#fff",
    marginBottom: 20,
    fontSize: 16
  },
  card: {
    backgroundColor: "#333",
    borderRadius: 16,
    marginBottom: 12,
    marginHorizontal: 8,
    padding: 12,
    shadowColor: "#FFD700",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 8
  },
  cardContent: { marginBottom: 10 },
  nombre: { color: "#FFD700", fontSize: 18, fontWeight: "bold" },
  precio: { color: "#fff", fontSize: 16, marginTop: 5 },
  fechaIngreso: { color: "#fff", fontSize: 14, marginTop: 5 },
  estado: { color: "#fff", fontSize: 14, marginTop: 5 },
  actions: { flexDirection: "row", justifyContent: "space-around" },
  addButton: {
    position: "absolute",
    bottom: 24,
    right: 20,
    backgroundColor: "#FFD700",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20
  },
  modalContainer: {
    backgroundColor: "#1e1e1e",
    borderRadius: 20,
    padding: 20,
    width: "100%"
  },
  modalTitle: {
    color: "#FFD700",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center"
  },
  input: {
    backgroundColor: "#2a2a2a",
    borderRadius: 10,
    padding: 12,
    color: "#fff",
    fontSize: 16,
    marginBottom: 10
  },
  saveButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10
  },
  saveButtonText: { color: "#000", fontWeight: "bold", fontSize: 16 },
  cancelText: {
    textAlign: "center",
    color: "#ccc",
    marginTop: 15,
    fontSize: 15
  }
});

export default MenuScreen;
