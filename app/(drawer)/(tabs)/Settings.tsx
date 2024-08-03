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
  const dispatch = useDispatch<AppDispatch>();

  const [preference, setPreference] = useState<string>("To Be Defined");
  const [loading, setLoading] = useState(false);
  const [sortingOrder, setSortingOrder] = useState<string>("To Be Defined");

  useEffect(() => {
    dispatch(api.fetchPreferences());
    if (data && data.sortingOrder) {
      setPreference(data.sortingOrder);
      setSortingOrder(data.sortingOrder);
    }
  }, [data, dispatch]);

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
    setPreference(newOrder);
    const sortingOrder = {
      id: 1,
      sortingOrder: newOrder,
      preferredTheme: "dark",
    };
    dispatch(api.updatePreference({ preference: sortingOrder }));
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
        <View style={styles.radioItem}>
          <RadioButton
            value="Date"
            color={Colors[theme].text}
            status={sortingOrder === "Date" ? "checked" : "unchecked"}
            onPress={() => handleSortingChange("Date")}
          />
          <ThemedText>Date</ThemedText>
        </View>
        <View style={styles.radioItem}>
          <RadioButton
            value="Rating"
            color={Colors[theme].text}
            status={sortingOrder === "Rating" ? "checked" : "unchecked"}
            onPress={() => handleSortingChange("Rating")}
          />
          <ThemedText>Rating</ThemedText>
        </View>
        <View style={styles.radioItem}>
          <RadioButton
            value="Alphabet"
            color={Colors[theme].text}
            status={sortingOrder === "Alphabet" ? "checked" : "unchecked"}
            onPress={() => handleSortingChange("Alphabet")}
          />
          <ThemedText>Alphabet</ThemedText>
        </View>
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
