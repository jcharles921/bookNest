import { Image, StyleSheet, Platform, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>Home</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container:{
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    
  }

});
