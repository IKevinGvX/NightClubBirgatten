// src/components/styles.js
import { StyleSheet, Platform, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const isTablet = width > 600;

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: isTablet ? 100 : 30,
    paddingTop: Platform.OS === "android" ? 40 : 0,
    backgroundColor: "#1c1c1c",
  },

  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },

  overlay: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: isTablet ? 120 : 30,
  },
title: {
  fontSize: isTablet ? 52 : 38,
  fontWeight: "bold",
  color: "#FFD700",
  marginBottom: 40,
  textAlign: "center",
  textShadowColor: "#000",
  textShadowOffset: { width: 1, height: 2 },
  textShadowRadius: 6,
  letterSpacing: 2,
  fontStyle: "italic", // opcional
  fontFamily: "Lobster_400Regular", // si cargaste la fuente
  textTransform: "uppercase",
},


  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 14,
    paddingHorizontal: 15,
    height: 55,
    width: "100%",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#bbb",
  },

  inputIcon: {
    marginRight: 10,
    color: "#777",
  },

  inputField: {
    flex: 1,
    fontSize: 18,
    color: "#333",
    paddingVertical: 0,
  },

  button: {
    width: "100%",
    height: 55,
    backgroundColor: "#b30000",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 7,
  },

  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
    textTransform: "uppercase",
  },

  startButton: {
    width: isTablet ? 320 : "80%",
    height: 55,
    backgroundColor: "#8B0000",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    elevation: 5,
  },

  startButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
  }
});


