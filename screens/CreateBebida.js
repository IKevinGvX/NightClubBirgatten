import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";
import AwesomeAlert from "react-native-awesome-alerts";

const CreateBebida = ({ navigation }) => {
  const [product, setProduct] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    categoria: "",
    estado: "activo"
  });

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Configuración del DropdownPicker
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Cerveza", value: "Cerveza" },
    { label: "Vino", value: "Vino" },
    { label: "Whisky", value: "Whisky" },
    { label: "Cócteles", value: "Cócteles" },
    { label: "Licores", value: "Licores" },
    { label: "Tequila", value: "Tequila" },
    { label: "Ginebra", value: "Ginebra" },
    { label: "Rum", value: "Rum" },
    { label: "Vodka", value: "Vodka" },
    { label: "Comida", value: "Comida" },
    { label: "Otros", value: "Otros" }
  ]);

  const handleInputChange = (field, value) => {
    setProduct((prevState) => ({
      ...prevState,
      [field]: value
    }));
  };

  const guardarBebida = async () => {
    const { nombre, descripcion, precio, stock, estado } = product;
    const categoria = value;

    if (!nombre || !descripcion || !precio || !categoria || !stock) {
      setAlertMessage("Complete all fields");
      return setAlertVisible(true);
    }

    if (isNaN(parseFloat(precio)) || isNaN(parseInt(stock))) {
      setAlertMessage("Invalid price or stock");
      return setAlertVisible(true);
    }

    const newBebida = {
      nombre,
      descripcion,
      precio: parseFloat(precio),
      stock: parseInt(stock),
      categoria,
      estado,
      fechaIngreso: new Date()
    };

    try {
      await axios.post(
        "http://apiswagger.somee.com/api/productos/addme",
        newBebida
      );
      navigation.goBack(); // Regresar al listado de productos
    } catch (error) {
      setAlertMessage("Could not create the product");
      setAlertVisible(true);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create New Product</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={product.nombre}
        onChangeText={(text) => handleInputChange("nombre", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={product.descripcion}
        onChangeText={(text) => handleInputChange("descripcion", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={product.precio}
        onChangeText={(text) => handleInputChange("precio", text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Stock"
        value={product.stock}
        onChangeText={(text) => handleInputChange("stock", text)}
        keyboardType="numeric"
      />

      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Select a category"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />

      <TouchableOpacity style={styles.saveButton} onPress={guardarBebida}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>

      <AwesomeAlert
        show={alertVisible}
        title="Notification"
        message={alertMessage}
        closeOnTouchOutside={true}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor="#FFD700"
        onConfirmPressed={() => setAlertVisible(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", paddingHorizontal: 16 },
  title: {
    fontSize: 26,
    color: "#FFD700",
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20
  },
  input: {
    backgroundColor: "#2a2a2a",
    borderRadius: 12,
    padding: 12,
    color: "#fff",
    marginBottom: 12,
    fontSize: 16
  },
  dropdown: {
    backgroundColor: "#2a2a2a",
    borderColor: "#444",
    marginBottom: 12,
    borderRadius: 12
  },
  dropdownContainer: {
    backgroundColor: "#2a2a2a",
    borderColor: "#444"
  },
  saveButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  saveButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16
  }
});

export default CreateBebida;
