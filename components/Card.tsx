import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";

const Card = () => {
  const styles = StyleSheet.create({
    card: {
      backgroundColor: "white",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      padding: 20,
      margin: 10,
      borderRadius: 10,
    },
  });
  return (
    <View style={styles.card}>
      <ThemedText> Card</ThemedText>
    </View>
  );
};

export default Card;
