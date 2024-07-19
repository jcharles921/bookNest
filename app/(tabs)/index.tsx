import React, { useEffect } from 'react';
import { StyleSheet, View, Button, Text, FlatList } from 'react-native';
import Colors from '@/utils/Colors';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { ThemedText } from '@/components/ThemedText';
import Header from '@/components/Header';
import api from '@/store/apis'; // Adjust the path if needed

export default function HomeScreen() {
  const theme = useSelector((state: RootState) => state.ThemeMode.themeMode) as "light" | "dark";
  const { data, loading, error } = useSelector((state: RootState) => state.FetchBookSlice);
  const dispatch = useDispatch<AppDispatch>();
  const books = data as any[];

  const styles = StyleSheet.create({
    welcomeText: {
      fontSize: 28,
    },
    welcomeText2: {
      fontSize: 16,
    },
    container: {
      backgroundColor: Colors[theme].background,
      height: "100%",
      paddingLeft: 20,
      fontFamily: "Eina",
    },
    button: {
      marginTop: 20,
    },
    bookItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
  });

  const handleAddBook = () => {
    dispatch(api.addBook({
      name: 'Sample Book',
      author: 'Sample Author',
      image: 'sample_image_url',
      read: false,
      createdAt: Date.now(),
      rating: 5,
    }));
  };

  useEffect(() => {
    dispatch(api.fetchBooks());
  }, [dispatch]);

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
      <Button title="Add Book" onPress={handleAddBook} />
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error}</Text>}
      <FlatList
        data={books}
        keyExtractor={(item) => item.id?.toString() || '0'}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Text>Name: {item.name}</Text>
            <Text>Author: {item.author}</Text>
            <Text>Rating: {item.rating}</Text>
          </View>
        )}
      />
    </View>
  );
}
