import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { Searchbar, Title, Paragraph, Button } from "react-native-paper";
import { ActivityIndicator } from "react-native-paper";
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
  useEffect(() => {
    dispatch(api.resetAll());
    dispatch(api.fetchBooks());
  }, [dispatch, success, updated]);
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
      fontFamily: "Eina",
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
  });

  const onChangeSearch = (query: string) => setSearchQuery(query);

  const handleRatingUpdate = (id: number, rating: number) => {
    dispatch(api.updateBook({ id, book: { rating } }));
  };

  const handleReadToggle = (id: number, read: boolean) => {
    dispatch(api.updateBook({ id, book: { read } }));
  };

  const filteredBooks = books.filter(
    (book) =>
      book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log(books);

  return (
    <View style={styles.container}>
      <Header>
        <View>
          <ThemedText style={styles.welcomeText}>Hi Fela!</ThemedText>
          <ThemedText style={styles.welcomeText2}>
            What are you reading today?
          </ThemedText>
        </View>
      </Header>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
      />
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error}</Text>}
      {(loading || loading2) ? (
        <ActivityIndicator animating={true} color={"black"} />
      ) : (
        <View style={styles.row1}>
          <Card books={filteredBooks} />
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
