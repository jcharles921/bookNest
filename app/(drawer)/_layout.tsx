import React from "react";
import { Drawer } from "expo-router/drawer";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { View, StyleSheet, Pressable } from "react-native";
import { setThemeMode } from "@/store/reducer/ThemeMode";
import Colors from "@/utils/Colors";
import { ThemedText } from "@/components/ThemedText";

const CustomDrawerContent = (props: any) => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.ThemeMode.themeMode) as
    | "light"
    | "dark";
  const toggleTheme = () => {
    dispatch(setThemeMode(theme === "light" ? "dark" : "light"));
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[theme].background,
    },
    header: {
      padding: 16,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    headerText: {
      fontSize: 20,
      fontWeight: "bold",
      color: Colors[theme].text,
    },
    toggle: {
      justifyContent: "center",
      alignItems: "center",
      width: 30,
      height: 30,
    },
  });

  return (
    <DrawerContentScrollView {...props} style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.headerText}>Menu</ThemedText>
        <Pressable onPress={toggleTheme} style={styles.toggle}>
          {theme === "light" ? (
            <MaterialIcons
              name="dark-mode"
              size={24}
              color={Colors[theme].icon}
            />
          ) : (
            <MaterialIcons name="sunny" size={24} color={Colors[theme].icon} />
          )}
        </Pressable>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export default function DrawerLayout() {
  const theme = useSelector((state: RootState) => state.ThemeMode.themeMode) as
    | "light"
    | "dark";

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors[theme].background,
          shadowColor: "white",
        },
        headerTintColor: Colors[theme].text,
        drawerActiveTintColor: Colors[theme].text,
        drawerInactiveTintColor: Colors[theme].secondaryText,
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: "Home",
          title: "Home",
          drawerIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={Colors[theme].text}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Light"
        options={{
          drawerLabel: "Light sensor",
          title: "Light sensor",
          drawerIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "bulb" : "bulb-outline"}
              size={24}
              color={Colors[theme].text}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Map"
        options={{
          drawerLabel: "Map",
          title: "Map ",
          drawerIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "map" : "map-outline"}
              size={24}
              color={Colors[theme].text}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Measurement"
        options={{
          drawerLabel: "Measurement",
          title: "Measurement ",
          drawerIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "compass" : "compass-outline"}
              size={24}
              color={Colors[theme].text}
            />
          ),
        }}
      />
    </Drawer>
  );
}
