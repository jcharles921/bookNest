import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { ThemedText } from "./ThemedText";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/utils/Colors";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

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
  const theme = useSelector((state: RootState) => state.ThemeMode.themeMode) as
    | "light"
    | "dark";
  const styles = StyleSheet.create({
    card: {
      width: 116,
    },
    image: {
      width: 116,
      maxHeight: 154,
      height: "100%",
      borderRadius: 8.44,
    },
    bookItem: {
      marginBottom: 10,
    },
    imageBox: {
      position: "relative",
      shadowColor: Colors[theme].background,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      borderRadius: 8.44,
    },
  });

  return (
    <>
      {books.map((book) => (
        <View key={book.id} style={styles.card}>
          {/* <ThemedText>Name: {book.name}</ThemedText>
          <ThemedText>Author: {book.author}</ThemedText>
          <ThemedText>Rating: {book.rating}</ThemedText>
          <ThemedText>Read: {book.read ? "Yes" : "No"}</ThemedText>
          <ThemedText>Created At: {new Date(book.createdAt).toDateString()}</ThemedText> */}
          <View style={styles.imageBox}>
            <View>
              <FontAwesome name="star" size={12} color={"#FFD335"} />{" "}
              <ThemedText>{book.rating}</ThemedText>
            </View>
            <Image source={{ uri: book.image }} style={styles.image} />
          </View>
          <View></View>
          <View></View>
        </View>
      ))}
    </>
  );
};

export default Card;
