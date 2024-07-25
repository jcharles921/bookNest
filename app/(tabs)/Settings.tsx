import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Colors from "@/utils/Colors";
import { ThemedText } from "@/components/ThemedText";
import { resetDatabase } from "@/db/seeders";
import Header from "@/components/Header";

export default function Settings() {
  const theme = useSelector((state: RootState) => state.ThemeMode.themeMode) as "light" | "dark";
  const [loading, setLoading] = useState(false);
  
  const styles = StyleSheet.create({
    titleContainer: {
      height: "100%",
      backgroundColor: Colors[theme].background,
      padding: 20,
    },
    button: {
      backgroundColor: "red",
    },
    welcomeText: {
      fontSize: 28,
      fontFamily: "Eina",
      color: Colors[theme].text,
    },
  });
  
  const handleReset = async () => {
    try {
      setLoading(true);
      await resetDatabase();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.titleContainer}>
      <Header>
        <ThemedText style={styles.welcomeText}>Settings</ThemedText>
      </Header>
      <Button 
        textColor={Colors[theme].text2} 
        loading={loading} 
        style={styles.button} 
        onPress={handleReset}
        mode="contained"
        contentStyle={{ flexDirection: 'row-reverse' }}
      >
        {loading ? 'Loading...' : 'Reset Data'}
      </Button>
    </View>
  );
}
