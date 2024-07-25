import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ThemedText } from "@/components/ThemedText";
import { RootState, AppDispatch } from "@/store";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/components/Header";
import Colors from "@/utils/Colors";
import * as ImagePicker from "expo-image-picker";
import api from "@/store/apis";
import FlatListCard from "@/components/FlatListCard";

export default function AddBook() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const theme = useSelector((state: RootState) => state.ThemeMode.themeMode) as
    | "light"
    | "dark";
  const isDark = theme === "dark";
  const {
    data: books,
    loading,
    error,
  } = useSelector((state: RootState) => state.FetchBookSlice);
  const { success } = useSelector((state: RootState) => state.CreateBookSlice);
  const { success: updated, loading: loading2 } = useSelector(
    (state: RootState) => state.updateBook
  );
  useEffect(() => {
    dispatch(api.resetAll());
    dispatch(api.fetchBooks());
  }, [dispatch, success, updated]);
  const refresh = () => {
    dispatch(api.resetAll());
    dispatch(api.fetchBooks());
  };
  const styles = StyleSheet.create({
    container: {
      paddingLeft: 16,
      backgroundColor: Colors[theme].background,
      height: "100%",
    },
    welcomeText: {
      fontSize: 28,
      fontFamily: "Eina",
      color: Colors[theme].text,
    },
    flatList: {
      marginTop: 16,
      paddingRight: 24,
    },
    addBox: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      marginBottom: 12,
      marginRight: 24,
    },
    addText: {
      color: Colors[theme].text,
      fontSize: 16,
      fontFamily: "Inter",
      marginRight: 8,
      fontWeight: 400,
    },
  });
  const handleAddButton = () => {
    router.navigate("AddBook");
  };

  return (
    <View style={styles.container}>
      <Header>
        <ThemedText style={styles.welcomeText}>My Books</ThemedText>
      </Header>

      <Pressable onPress={handleAddButton} style={styles.addBox}>
        <ThemedText style={styles.addText}>Add Book</ThemedText>
        <Ionicons
          size={30}
          name="add-circle-outline"
          color={isDark ? "white" : "black"}
        />
      </Pressable>
      <ScrollView
        style={styles.flatList}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} />
        }
      >
        <FlatListCard books={books} />
      </ScrollView>
    </View>
  );
}
