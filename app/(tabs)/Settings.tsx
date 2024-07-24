import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import Colors from "@/utils/Colors";
import { ThemedText } from "@/components/ThemedText";
import { View } from "react-native";
import { seedBooks } from "@/db/seeders";

export default function Settings() {
  const theme = useSelector((state: RootState) => state.ThemeMode.themeMode) as
    | "light"
    | "dark";
  const styles = StyleSheet.create({
    titleContainer: {
      height: "100%",
      backgroundColor: Colors[theme].background,
      padding: 20,
    },
    button: {
      backgroundColor: "red",
      color: "white",
    },
  });
  const handleReset = async () => {
    const response = await seedBooks();
    if (response === "Success") {
      alert("Data reset successfully");
    }
  };
  return (
    <View>
      <View style={styles.titleContainer}>
        <ThemedText>Settings</ThemedText>
        <Button style={styles.button} onPress={handleReset}>
          Reset Data
        </Button>
      </View>
    </View>
  );
}
