import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  Pressable,
  RefreshControl,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { ThemedText } from "./ThemedText";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import Colors from "@/utils/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import api from "@/store/apis";
import { MaterialIcons } from "@expo/vector-icons";
import { setBookToEdit } from "@/store/reducer/editBookSlice";
import { useRouter } from "expo-router";

interface Props {
  books: Book[];
}

const FlatListCard: React.FC<Props> = ({ books }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [refreshing, setRefreshing] = useState(false);

  const theme = useSelector((state: RootState) => state.ThemeMode.themeMode) as
    | "light"
    | "dark";

  const { loading }: { loading: any } = useSelector(
    (state: RootState) => state.FetchBookSlice
  );
  const router = useRouter();

  const { success, error } = useSelector(
    (state: RootState) => state.deleteBookSlice
  );
  const handleDelete = (bookId?: number) => {
    if (bookId !== undefined) {
      dispatch(api.deleteBook(bookId));
    }
  };

  const styles = StyleSheet.create({
    card: {
      width: "100%",
      maxWidth: 327,
      marginBottom: 24,
      position: "relative",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    image: {
      width: 60,
      height: 80,
      borderRadius: 8.44,
      fontFamily: "GupterRegular",
    },
    bookItem: {
      marginBottom: 10,
    },
    imageBox: {
      position: "relative",
      borderRightWidth: 4,
      borderBottomWidth: 2,
      borderColor: Colors[theme].border,
      borderRadius: 12,
    },
    cardWrapper: {
      overflow: "scroll",
      height: 273,
    },
    rating: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    ratingText: {
      color: Colors[theme].text,
      fontWeight: 800,
    },
    readStatus: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: 70,
    },
    title: {
      color: Colors[theme].text,
      fontSize: 14,
      fontWeight: "bold",
      marginTop: 5,
    },
    subtitle: {
      color: Colors[theme].secondaryText,
      marginTop: 5,
      marginBottom: 5,
      fontSize: 12,
    },
    finish: {
      color: Colors[theme].text,
      fontWeight: "bold",
      fontSize: 12,
    },
    loader: {
      width: 50,
      height: 50,
      zIndex: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    textBox: {
      width: 150,
      marginLeft: 16,
    },
  });
  const refresh = useCallback(() => {
    setRefreshing(true);
    dispatch(api.resetAll());
    dispatch(api.fetchBooks()).finally(() => setRefreshing(false));
  }, [dispatch]);
  const handleEdit = (book: Book) => {
    dispatch(setBookToEdit(book));
    router.navigate("AddBook");
  };
  useEffect(() => {
    if (success) {
      refresh();
    }
  }, [success, refresh]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refresh} />
      }
    >
      {!loading &&
        books
          // .slice()
          // .reverse()
          .map((book) => (
            <View key={book.id} style={styles.card}>
              <View style={styles.imageBox}>
                <Image source={{ uri: book.image }} style={styles.image} />
              </View>
              <View style={styles.textBox}>
                <View style={styles.rating}>
                  <FontAwesome name="star" size={14} color="#FFD335" />
                  <ThemedText style={styles.ratingText}>
                    {book.rating}
                  </ThemedText>
                </View>
                <ThemedText
                  style={styles.title}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {book.name}
                </ThemedText>
                <ThemedText
                  style={styles.subtitle}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {book.author}
                </ThemedText>
              </View>
              <Pressable style={styles.readStatus}>
                <MaterialCommunityIcons
                  name="delete"
                  size={24}
                  color="red"
                  onPress={() => handleDelete(book.id)}
                />
                <MaterialIcons
                  name="mode-edit"
                  size={24}
                  color={Colors[theme].text}
                  onPress={() => handleEdit(book)}
                />
              </Pressable>
            </View>
          ))}
    </ScrollView>
  );
};

export default FlatListCard;
