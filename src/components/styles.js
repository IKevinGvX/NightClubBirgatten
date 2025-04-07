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
    backgroundColor: "transparent",
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
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Fondo más oscuro para contraste
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: isTablet ? 120 : 30,
    borderRadius: 25,
  },

  title: {
    fontSize: isTablet ? 60 : 40,
    fontWeight: "bold",
    color: "#FFD700", // Dorado para resaltar el título
    marginBottom: 50,
    textAlign: "center",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 10,
    letterSpacing: 3,
    fontStyle: "italic",
    fontFamily: "Lobster_400Regular",
    textTransform: "uppercase",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 15,
    paddingHorizontal: 18,
    height: 55,
    width: "100%",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#bbb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },

  inputIcon: {
    marginRight: 12,
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
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
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
    elevation: 7,
  },

  startButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});