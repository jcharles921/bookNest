import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { Provider } from "react-redux";
import { store } from "@/store";
import { useColorScheme } from "@/hooks/useColorScheme";
import { MD3DarkTheme, PaperProvider } from "react-native-paper";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import { View, Text } from "react-native";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations"; // Adjust the path if necessary
import { seedBooks } from "@/db/seeders";

SplashScreen.preventAutoHideAsync();

const CustomDarkTheme = {
  ...MD3DarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...NavigationDarkTheme.colors,
    primary: "#000000", // Change primary color
    background: "#1E1E1E", // Change background color
    card: "#1f1f1f", // Change card color
    text: "#ffffff", // Change text color
    border: "#272727", // Change border color
    notification: "#ff4081", // Change notification color
    myOwnColor: "#BADA55", // Custom color
  },
  myOwnProperty: true, // Custom property
};

const expoDb = openDatabaseSync("db.db");
const db = drizzle(expoDb);

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Inter: require("../assets/fonts/Inter-VariableFont_slnt,wght.ttf"),
    Eina: require("../assets/fonts/eina-01-regular.ttf"),
  });

  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    async function initialize() {
      if (loaded && success) {
        await seedBooks();
        SplashScreen.hideAsync();
      }
    }

    initialize();
  }, [loaded, success]);

  if (!loaded || !success) {
    return null;
  }

  if (error) {
    return (
      <View>
        <Text>Migration error: {error.message}</Text>
      </View>
    );
  }

  return (
    <ThemeProvider
      value={colorScheme === "dark" ? CustomDarkTheme : DefaultTheme}
    >
      <PaperProvider
        theme={colorScheme === "dark" ? CustomDarkTheme : DefaultTheme}
      >
        <Provider store={store}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </Provider>
      </PaperProvider>
    </ThemeProvider>
  );
}
