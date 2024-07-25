import React, { useEffect } from "react";
import { StyleSheet, View, Image, Alert } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { ThemedText } from "@/components/ThemedText";
import api from "@/store/apis"; // You need to implement this action in your Redux store
import Colors from "@/utils/Colors";
import { RootState, AppDispatch } from "@/store";
import { Formik } from "formik";
import * as Yup from "yup";
import { Rating } from "react-native-ratings";

const AddBookSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  author: Yup.string().required("Author is required"),
  rating: Yup.number().required("Rating is required").min(1).max(5),
});

export default function AddBook() {
  const dispatch = useDispatch<AppDispatch>();
  const { success, error } = useSelector(
    (state: RootState) => state.CreateBookSlice
  );
  const theme = useSelector((state: RootState) => state.ThemeMode.themeMode) as
    | "light"
    | "dark";
  const styles = StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: Colors[theme].background,
      height: "100%",
    },
    titleContainer: {
      flexDirection: "row",
      backgroundColor: Colors[theme].background,
      gap: 8,
    },
    input: {
      marginBottom: 16,
      backgroundColor: Colors[theme].background,
      borderColor: Colors[theme].border,
      color: Colors[theme].text,
      fontFamily: "Inter",
    },
    image: {
      width: 100,
      height: 100,
      marginBottom: 16,
    },
    errorText: {
      color: "red",
      marginBottom: 8,
    },
    button: {
      backgroundColor: Colors[theme].background2,
      color: "white",
      borderRadius: 50,
      borderWidth: 1,
      borderColor: Colors[theme].border,
      width: 150,
      marginBottom: 15,
    },
  });

  useEffect(() => {
    dispatch(api.fetchBooks());
  }, [dispatch]);

  useEffect(() => {
    dispatch(api.resetAll());
    dispatch(api.fetchBooks());
  }, [dispatch, success]);

  useEffect(() => {
    dispatch(api.resetOnError());
  }, [error]);

  const handleSelectImage = async (setFieldValue: any) => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("You've refused to allow this app to access your photos!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.canceled) {
      setFieldValue("image", pickerResult.assets[0].uri);
    }
  };

  return (
    <Formik
      initialValues={{ name: "", author: "", image: "", rating: 0 }}
      validationSchema={AddBookSchema}
      onSubmit={(values, { resetForm }) => {
        const newBook = {
          ...values,
          read: false,
          createdAt: new Date().toISOString(),
        };
        dispatch(api.addBook(newBook));
        resetForm();
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
      }) => (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <ThemedText>Add Book</ThemedText>
          </View>
          <TextInput
            mode="outlined"
            label="Name"
            style={styles.input}
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            value={values.name}
            error={Boolean(errors.name) || Boolean(touched.name)}
          />
          {touched.name && errors.name ? (
            <ThemedText style={styles.errorText}>{errors.name}</ThemedText>
          ) : null}
          <TextInput
            mode="outlined"
            label="Author"
            style={styles.input}
            onChangeText={handleChange("author")}
            onBlur={handleBlur("author")}
            value={values.author}
            error={Boolean(errors.author) || Boolean(touched.author)}
          />
          {touched.author && errors.author ? (
            <ThemedText style={styles.errorText}>{errors.author}</ThemedText>
          ) : null}
          <Rating
            onFinishRating={(rating: any) => setFieldValue("rating", rating)}
            style={{
              marginBottom: 16,
              backgroundColor: Colors[theme].background,
              alignSelf: "flex-start",
            }}
            imageSize={30}
          />
          {touched.rating && errors.rating ? (
            <ThemedText style={styles.errorText}>{errors.rating}</ThemedText>
          ) : null}
          <Button
            textColor={Colors[theme].text2}
            onPress={() => handleSelectImage(setFieldValue)}
            style={styles.button}
          >
            Select Image
          </Button>
          {values.image ? (
            <Image source={{ uri: values.image }} style={styles.image} />
          ) : null}
          <Button
            textColor={Colors[theme].text2}
            onPress={(e: any) => handleSubmit()}
            style={styles.button}
          >
            Submit
          </Button>
        </View>
      )}
    </Formik>
  );
}
