import React, { useState } from "react";
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
import { MaterialCommunityIcons } from '@expo/vector-icons';
import api from "@/store/apis";
import { MaterialIcons } from '@expo/vector-icons';
interface Props {
  books: Book[];
}

const FlatListCard: React.FC<Props> = ({ books }) => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.ThemeMode.themeMode) as
    | "light"
    | "dark";
  const [loadingCards, setLoadingCards] = useState<{ [key: number]: boolean }>(
    {}
  );

  const [loading2, setLoading2] = useState(false);
  const isDark = theme === "dark";
  const { loading } = useSelector((state: RootState) => state.FetchBookSlice);

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
      fontFamily: "Eina",
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

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={loading2} />}>
      {!loading &&
        books
          .slice()
          .reverse()
          .map((book) => (
            <View key={book.id} style={styles.card}>
              <View style={styles.imageBox}>
                <Image source={{ uri: book.image }} style={styles.image} />
              </View>
              <View style={styles.textBox}>
                <View style={styles.rating}>
                  <FontAwesome name="star" size={14} color="#FFD335" />
                  <ThemedText style={styles.ratingText}>{book.rating}</ThemedText>
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
              <Pressable
                //   onPressIn={() => handleReadToggle(book)}
                style={styles.readStatus}
                //   onPress={() => handleReadToggle(book)}
              >
                <MaterialCommunityIcons name="delete" size={24} color="red" />
                <MaterialIcons name="mode-edit" size={24} color={Colors[theme].text} />
              </Pressable>
            </View>
          ))}
    </ScrollView>
  );
};

export default FlatListCard;