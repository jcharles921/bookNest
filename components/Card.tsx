import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  Pressable,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Colors from "@/utils/Colors";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { ActivityIndicator } from "react-native-paper";
import api from "@/store/apis";

interface Book {
  id?: number;
  name: string;
  author: string;
  image: string;
  read: boolean;
  createdAt: string;
  rating: number;
}

interface Props {
  books: Book[];
}

const Card: React.FC<Props> = ({ books }) => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.ThemeMode.themeMode) as
    | "light"
    | "dark";

  const { success, error } = useSelector(
    (state: RootState) => state.updateBook
  );
  const isDark = theme === "dark";
  const { loading } = useSelector((state: RootState) => state.FetchBookSlice);

  const styles = StyleSheet.create({
    card: {
      width: 116,
      position: "relative",
      marginRight: 24,
    },
    image: {
      width: 110,
      height: 154,
      borderRadius: 8.44,
    },
    bookItem: {
      marginBottom: 10,
    },
    imageBox: {
      position: "relative",
      borderRightWidth: 9,
      borderBottomWidth: 4,
      borderLeftWidth: 1,
      borderColor: Colors[theme].border,
      borderRadius: 12,
    },
    cardWrapper: {
      overflow: "scroll",
      height: 273,
    },
    rating: {
      position: "absolute",
      top: 0,
      zIndex: 10,
      color: Colors[theme].text2,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      backgroundColor: Colors[theme].background2,
      padding: 5,
      borderTopLeftRadius: 8.44,
    },
    ratingText: {
      color: Colors[theme].text2,
    },
    readStatus: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    title: {
      color: Colors[theme].text,
      fontSize: 12,
      marginTop: 5,
    },
    subtitle: {
      color: Colors[theme].secondaryText,
      marginTop: 5,
      marginBottom: 5,
      fontSize: 10,
    },
    finish: {
      color: Colors[theme].text,
      fontWeight: "bold",
      fontSize: 12,
    },
  });

  const handleReadToggle = async (book: Book) => {
    const updatedBook: Partial<Book> = { read: !book.read };
    if (book.id !== undefined) {
      dispatch(api.updateBook({ id: book.id, book: updatedBook }));
    }
  };

  const truncateText = (text: string, maxWords: number) => {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
  };

  return (
    <ScrollView horizontal={true} style={styles.cardWrapper}>
      {!loading &&
        books.map((book) => (
          <View key={book.id} style={styles.card}>
            <View style={styles.imageBox}>
              <View style={styles.rating}>
                <FontAwesome name="star" size={12} color={"#FFD335"} />
                <Text style={styles.ratingText}>{book.rating}</Text>
              </View>
              <Image source={{ uri: book.image }} style={styles.image} />
            </View>
            <ThemedText
              style={styles.title}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {truncateText(book.name, 3)}
            </ThemedText>
            <ThemedText
              style={styles.subtitle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {truncateText(book.author, 2)}
            </ThemedText>
            <Pressable
            onPressIn={() => handleReadToggle(book)}
              style={styles.readStatus}
              onPress={() => handleReadToggle(book)}
            >
              <Ionicons
                name={
                  book.read
                    ? "checkmark-done-circle"
                    : "checkmark-done-circle-outline"
                }
                size={24}
                color={isDark ? "white" : "black"}
              />
              {book.read && (
                <ThemedText style={styles.finish}>Completed</ThemedText>
              )}
              {!book.read && (
                <ThemedText style={styles.subtitle}>On going</ThemedText>
              )}
            </Pressable>
          </View>
        ))}
    </ScrollView>
  );
};

export default Card;
