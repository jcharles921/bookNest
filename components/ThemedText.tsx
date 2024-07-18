import { Text, type TextProps, StyleSheet } from 'react-native';
import { RootState } from "@/store";
import { useThemeColor } from '@/hooks/useThemeColor';
import { useSelector } from 'react-redux';
import Colors from '@/utils/Colors';
export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const theme = useSelector((state: RootState) => state.ThemeMode.themeMode) as
  | "light"
  | "dark";
  const styles = StyleSheet.create({
    default: {
      fontSize: 14,
      color:Colors[theme].text,
    },
    defaultSemiBold: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '600',
      color:Colors[theme].text,
    },
    title: {
      fontSize: 16,
      color:Colors[theme].text,
    },
    subtitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color:Colors[theme].text,
    },
    link: {
      lineHeight: 30,
      fontSize: 16,
      color:Colors[theme].text,
    },
  });

  

  return (
    <Text
      style={[
        { color: Colors[theme].text },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}


