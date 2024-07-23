import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, Button, View, Image, Alert } from "react-native";
import { useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { ThemedText } from "@/components/ThemedText";
import api from "@/store/apis"; // You need to implement this action in your Redux store
import Colors from "@/utils/Colors";
import { RootState, AppDispatch } from "@/store";

export default function AddBook() {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [rating, setRating] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(api.fetchBooks());
  }, [dispatch]);

  const handleSelectImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("You've refused to allow this app to access your photos!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.canceled) {
      setImage(pickerResult.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!image) {
      Alert.alert("Please select an image first.");
      return;
    }
    const clearDateBase =()=>{
      dispatch(api.clearDatabase());
    }

    const newBook = {
      name,
      author,
      image,
      read: false, // default value
      createdAt: new Date().toISOString(), // current timestamp
      rating: parseInt(rating),
    };
    dispatch(api.addBook(newBook));
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <ThemedText>Add Book</ThemedText>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Author"
        value={author}
        onChangeText={setAuthor}
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
      />
      <TextInput
        style={styles.input}
        placeholder="Rating"
        value={rating}
        onChangeText={setRating}
        keyboardType="numeric"
      />
      <Button title="Select Image" onPress={handleSelectImage} />
      {image ? <Image source={{ uri: image }} style={styles.image} /> : null}
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
});
