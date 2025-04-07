import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Pantallas
import HomeScreen from "../../screens/HomeScreen";
import MenuScreen from "../../screens/MenuScreen";
import SettingsScreen from "../../screens/SettingsScreen";
import CartaScreen from "../../screens/CartaScreen";
import ReservarScreen from "../../screens/ReservarScreen";
import PromosScreen from "../../screens/PromosScreen";

const Principal = ({ user }) => {
  const [activeTab, setActiveTab] = useState("Inicio");

  const renderScreen = () => {
    switch (activeTab) {
      case "Inicio":
        return <HomeScreen user={user} onNavigate={setActiveTab} />;
      case "Menú":
        return <MenuScreen />;
      case "Ajustes":
        return <SettingsScreen />;
      case "Carta":
        return <CartaScreen />;
      case "Reservar":
        return <ReservarScreen />;
      case "Promos":
        return <PromosScreen />;
      default:
        return <HomeScreen user={user} onNavigate={setActiveTab} />;
    }
  };

  const tabs = [
    { label: "Inicio", icon: "home" },
    { label: "Menú", icon: "glass-cocktail" },
    { label: "Ajustes", icon: "cog-outline" }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.content}>{renderScreen()}</View>

      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const focused = activeTab === tab.label;
          return (
            <TouchableOpacity
              key={tab.label}
              style={styles.tabButton}
              onPress={() => setActiveTab(tab.label)}
            >
              <MaterialCommunityIcons
                name={tab.icon}
                size={26}
                color={focused ? "#FFD700" : "#aaa"}
              />
              <Text
                style={[
                  styles.tabText,
                  { color: focused ? "#FFD700" : "#aaa" }
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}

        {/* Botón de Reservar */}
        <TouchableOpacity
          style={styles.reserveButton}
          onPress={() => setActiveTab("Reservar")}
        >
          <MaterialCommunityIcons
            name="calendar-check"
            size={26}
            color="#FFD700"
          />
          <Text style={styles.tabText}>Reservar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212"
  },
  content: {
    flex: 1
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#1a1a1a",
    borderTopWidth: 1,
    borderTopColor: "#333"
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center"
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: "600"
  },
  reserveButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  }
});

export default Principal;
