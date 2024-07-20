import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform } from "react-native";

import { ThemedText } from "@/components/ThemedText";

import { View } from "react-native";

export default function SearchTab() {
  return (
    <View>
      <View style={styles.titleContainer}>
        <ThemedText >Search</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
