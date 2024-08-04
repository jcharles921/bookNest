import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  RefreshControl,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { Searchbar, ActivityIndicator } from "react-native-paper";
import api from "@/store/apis";
import Colors from "@/utils/Colors";
import Header from "@/components/Header";
import { ThemedText } from "@/components/ThemedText";
import Card from "@/components/Card";

const HomeScreen = () => {
  const theme = useSelector((state: RootState) => state.ThemeMode.themeMode) as
    | "light"
    | "dark";
  const {
    data: books,
    loading,
    error,
  } = useSelector((state: RootState) => state.FetchBookSlice);
  const { success } = useSelector((state: RootState) => state.CreateBookSlice);
  const { success: updated, loading: loading2 } = useSelector(
    (state: RootState) => state.updateBook
  );
  const dispatch = useDispatch<AppDispatch>();
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(api.resetAll());
    dispatch(api.fetchBooks());
  }, [dispatch, success, updated]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(api.fetchBooks()).then(() => setRefreshing(false));
  }, [dispatch]);

  const styles = StyleSheet.create({
    welcomeText: {
      fontSize: 28,
      color: Colors[theme].text,
    },
    welcomeText2: {
      fontSize: 16,
      color: Colors[theme].secondaryText,
    },
    container: {
      backgroundColor: Colors[theme].background,
      flex: 1,

      paddingLeft: 20,
      fontFamily: "GupterRegular",
    },
    button: {
      marginTop: 20,
      backgroundColor: Colors[theme].button,
    },
    imagePreview: {
      width: 100,
      height: 150,
      marginBottom: 10,
    },
    row1: {
      height: 273,
    },
    searchbar: {
      backgroundColor: Colors[theme].background,
      color: Colors[theme].text,
      borderWidth: 1,
      borderColor: Colors[theme].border,
      width: "90%",
      marginBottom: 30,
    },
    card: {
      backgroundColor: Colors[theme].background,
      marginBottom: 10,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    cardCover: {
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    cardContent: {
      padding: 10,
    },
    cardActions: {
      justifyContent: "space-between",
      padding: 10,
    },
    text: {
      color: Colors[theme].text,
    },
    buttonText: {
      color: Colors[theme].buttonText,
    },
    trends: {
      color: Colors[theme].text,
      fontSize: 20,
      marginTop: 20,
      marginBottom: 40,
    },
  });

  const onChangeSearch = (query: string) => setSearchQuery(query);

  const filteredBooks = books.filter(
    (book) =>
      book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortBooksByRating = (books: []) => {
    return [...books].sort((a: Book, b: Book) => b.rating - a.rating);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Header>
        <View>
          <ThemedText style={styles.welcomeText}>Hello !!!</ThemedText>
          <ThemedText style={styles.welcomeText2}>
            Nice to see you again 
          </ThemedText>
        </View>
      </Header>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
        theme={{ colors: { onSurfaceVariant: Colors[theme].placeholder } }}
      />
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error}</Text>}
      {loading ? (
        <ActivityIndicator animating={true} color={"black"} />
      ) : (
        <View style={styles.row1}>
          <Card books={filteredBooks} />
        </View>
      )}
      {loading2 && <ThemedText>Loading...</ThemedText>}
      <ThemedText style={styles.trends}>Top rates</ThemedText>
      <Card books={sortBooksByRating(books as [])} />
    </ScrollView>
  );
};

export default HomeScreen;
