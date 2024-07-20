import React, { useEffect, useState } from "react";
import { StyleSheet, View, Button, Text, FlatList, Image } from "react-native";
import Colors from "@/utils/Colors";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { ThemedText } from "@/components/ThemedText";
import Header from "@/components/Header";
import api from "@/store/apis";
import Card from "@/components/Card";
import * as ImagePicker from "expo-image-picker";

export default function HomeScreen() {
  const theme = useSelector((state: RootState) => state.ThemeMode.themeMode) as
    | "light"
    | "dark";
  const {
    data: books,
    loading,
    error,
  } = useSelector((state: RootState) => state.FetchBookSlice);
  const dispatch = useDispatch<AppDispatch>();
  const { success } = useSelector((state: RootState) => state.CreateBookSlice);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
    imagePreview: {
      width: 100,
      height: 150,
      marginBottom: 10,
    },
    row1: {
      display: "flex",
      flexDirection: "row",
      overflow: "scroll",
      height: 200,
      gap: 24,
    },
  });

  const handleSelectImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.canceled) {
      setSelectedImage(pickerResult.assets[0].uri);
    }
  };

  const handleAddBook = () => {
    if (!selectedImage) {
      alert("Please select an image first.");
      return;
    }

    dispatch(
      api.addBook({
        name: "Sample Book",
        author: "Sample Author",
        image: selectedImage,
        read: false,
        createdAt: new Date(),
        rating: 5,
      })
    );
  };

  useEffect(() => {
    dispatch(api.fetchBooks());
  }, [dispatch, success]);

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
      {/* <Button
        title="Clear Database"
        onPress={() => dispatch(api.clearDatabase())}
      />
      <Button title="Select Image" onPress={handleSelectImage} />
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
      )}
      <Button title="Add Book" onPress={handleAddBook} />
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error}</Text>} */}
      <View style={styles.row1}>
        <Card books={[]} />
      </View>
    </View>
  );
}
