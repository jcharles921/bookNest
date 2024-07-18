import { Image, StyleSheet, Platform, View } from "react-native";
import Colors from "@/utils/Colors";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ThemedText } from "@/components/ThemedText";
import Header from "@/components/Header";

export default function HomeScreen() {
  const theme = useSelector((state: RootState) => state.ThemeMode.themeMode) as
    | "light"
    | "dark";
  const styles = StyleSheet.create({
    welcomeText: {
      fontSize: 28,
    },
    welcomeText2: {
      fontSize: 16,
    },
    container: {
      backgroundColor: Colors[theme].background,
      height: "100%",
      paddingLeft: 20,
      fontFamily: "Eina",
    },
  });
  return (
    <View style={styles.container}>
      <Header>
        <View>
          <ThemedText style={styles.welcomeText}>Hi Fela !</ThemedText>
          <ThemedText style={styles.welcomeText2}>
            What are you reading today?
          </ThemedText>
        </View>
      </Header>
      <ThemedText>Home</ThemedText>
    </View>
  );
}
