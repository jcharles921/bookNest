import { Image, StyleSheet, Platform, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  return (
    <ThemedView>
      <ThemedText>Home</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({

});
