import { DarkTheme as NavigationDarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MD3DarkTheme, PaperProvider } from 'react-native-paper';

SplashScreen.preventAutoHideAsync();

const CustomDarkTheme = {
  ...MD3DarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...NavigationDarkTheme.colors,
    primary: '#000000', // Change primary color
    background: '#1E1E1E', // Change background color
    card: '#1f1f1f', // Change card color
    text: '#ffffff', // Change text color
    border: '#272727', // Change border color
    notification: '#ff4081', // Change notification color
    myOwnColor: '#BADA55', // Custom color
  },
  myOwnProperty: true, // Custom property
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Inter: require('../assets/fonts/Inter-VariableFont_slnt,wght.ttf'),
    Eina: require('../assets/fonts/eina-01-regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? CustomDarkTheme : DefaultTheme}>
      <PaperProvider theme={colorScheme === 'dark' ? CustomDarkTheme : DefaultTheme}>
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
