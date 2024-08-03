import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setThemeMode } from "@/store/reducer/ThemeMode";
import { View, StyleSheet, Pressable } from "react-native";
import Colors from "@/utils/Colors";
import { MaterialIcons  } from "@expo/vector-icons";

interface Props {
  children: any;
}

const Header: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.ThemeMode.themeMode) as
    | "light"
    | "dark";

  const toggleTheme = () => {
    dispatch(setThemeMode(theme === "light" ? "dark" : "light"));
  };

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: 60,
      marginBottom: 30,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: Colors[theme].background,
    },
    text: {
      color: Colors[theme].text,
      backgroundColor: Colors[theme].background,
    },
    button: {
      backgroundColor: Colors[theme].button,
    },
    toggle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 24,
      width: 30,
      height: 30,
    },
  });

  return (
    <View style={styles.container}>
      {children}
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
  );
};

export default Header;
