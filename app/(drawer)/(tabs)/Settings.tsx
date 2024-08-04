import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RadioButton, Button } from "react-native-paper";
import { RootState, AppDispatch } from "@/store";
import Colors from "@/utils/Colors";
import { ThemedText } from "@/components/ThemedText";
import { resetDatabase } from "@/db/seeders";
import Header from "@/components/Header";
import { FontAwesome } from "@expo/vector-icons";
import api from "@/store/apis";

export default function Settings() {
  const theme = useSelector((state: RootState) => state.ThemeMode.themeMode) as "light" | "dark";
  const { data } = useSelector((state: RootState) => state.fetchPreference);
  const { success } = useSelector((state: RootState) => state.updatePreference);
  const dispatch = useDispatch<AppDispatch>();

  const [sortingOrder, setSortingOrder] = useState<string>("Rating");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(api.fetchPreferences());
    if (data && data.sortingOrder) {
      setSortingOrder(data.sortingOrder);
    }
  }, []);
  useEffect(() => {
    dispatch(api.fetchPreferences());
setTimeout(() => {
  if (data && data.sortingOrder) {
    setSortingOrder(data.sortingOrder);
  }
}, 2000);
  }, [success]);

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
    sortingText: {
      fontSize: 16,
      fontFamily: "Inter",
      color: Colors[theme].text,
      fontWeight: "800",
      textTransform: "uppercase",
    },
    textBox: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 15,
    },
    radioGroup: {
      flexDirection: "column",
      marginBottom: 20,
    },
    radioItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 5,
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

  const handleSortingChange = (newOrder: string) => {
    setSortingOrder(newOrder);
    const preference = {
      id: 1,
      sortingOrder: newOrder,
      preferredTheme: theme,
    };
    dispatch(api.updatePreference({ preference }));
  };

  return (
    <View style={styles.titleContainer}>
      <Header>
        <ThemedText style={styles.welcomeText}>Preferences</ThemedText>
      </Header>
      <View style={styles.textBox}>
        <ThemedText style={styles.sortingText}>Sorting Order</ThemedText>
        <FontAwesome name="filter" color={Colors[theme].text} size={30} />
      </View>

      <View style={styles.radioGroup}>
        {["Date", "Rating", "Alphabet"].map((option) => (
          <View key={option} style={styles.radioItem}>
            <RadioButton
              value={option}
              color={Colors[theme].text}
              status={sortingOrder === option ? "checked" : "unchecked"}
              onPress={() => handleSortingChange(option)}
            />
            <ThemedText>{option}</ThemedText>
          </View>
        ))}
      </View>

      <Button
        textColor={Colors[theme].text2}
        loading={loading}
        style={styles.button}
        onPress={handleReset}
        mode="contained"
        contentStyle={{ flexDirection: "row-reverse" }}
      >
        {loading ? "Loading..." : "Reset Data"}
      </Button>
    </View>
  );
}