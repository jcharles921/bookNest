import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setThemeMode } from "@/store/reducer/ThemeMode";
import { View, StyleSheet, Text, Button } from "react-native";
import Colors, { ColorsType } from "@/utils/Colors"; // Import ColorsType

interface Props {
  children: any;
}

const Header: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.ThemeMode.themeMode) as 'light' | 'dark'; // Ensure theme is 'light' or 'dark'

  const toggleTheme = () => {
    dispatch(setThemeMode(theme === "light" ? "dark" : "light"));
  };

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors[theme].background,
    },
    text: {
      color: Colors[theme].text,
    },
    button: {
      backgroundColor: Colors[theme].button,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Header</Text>
      <Button title="Toggle Theme" onPress={toggleTheme} color={Colors[theme].button} />
      {children}
    </View>
  );
};

export default Header;
