import { Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import Colors from "@/utils/Colors";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function TabLayout() {
  const theme = useSelector((state: RootState) => state.ThemeMode.themeMode) as
    | "light"
    | "dark";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[theme].active,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors[theme].background,
          borderTopColor: Colors[theme].border,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="addBook"
        options={{
          title: "Add Book",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "add-circle" : "add-circle-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "settings" : "settings-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
