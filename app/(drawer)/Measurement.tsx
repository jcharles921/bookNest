import React, { useEffect, useState } from "react";
import { Accelerometer } from "expo-sensors";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

const LevelScreen: React.FC = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    (async () => {
      await Accelerometer.requestPermissionsAsync();
      const subscription = Accelerometer.addListener((accelerometerData) => {
        const { x, y, z } = accelerometerData;
        const newTilt = {
          x: Math.atan2(x, Math.sqrt(y * y + z * z)) * (180 / Math.PI),
          y: Math.atan2(y, Math.sqrt(x * x + z * z)) * (180 / Math.PI),
        };
        setTilt(newTilt);
      });
      return () => {
        subscription.remove();
      };
    })();
  }, []);

  const checkLevel = () => {
    Toast.hide();
    Toast.show({
      text1: `X-axis: ${tilt.x.toFixed(2)}°, Y-axis: ${tilt.y.toFixed(2)}°`,
      type: "success",
      autoHide: true,
    });
  };

  return (
    <View style={styles.container}>
      <LevelIndicator tilt={tilt} />
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          position: "absolute",
          bottom: 50,
          backgroundColor: "#000068",
          marginTop: 50,
          paddingVertical: 10,
          width: "50%",
          alignItems: "center",
        }}
        onPress={() => checkLevel()}
      >
        <Text style={{ color: "white" }}>Check Level</Text>
      </TouchableOpacity>
    </View>
  );
};

const LevelIndicator: React.FC<{ tilt: { x: number; y: number } }> = ({
  tilt,
}) => {
  const bubblePositionX = tilt.x * 2;
  const bubblePositionY = tilt.y * 2;
  const bubbleAnimationX = new Animated.Value(bubblePositionX);
  const bubbleAnimationY = new Animated.Value(bubblePositionY);

  Animated.timing(bubbleAnimationX, {
    toValue: bubblePositionX,
    duration: 300,
    easing: Easing.ease,
    useNativeDriver: true,
  }).start();

  Animated.timing(bubbleAnimationY, {
    toValue: bubblePositionY,
    duration: 300,
    easing: Easing.ease,
    useNativeDriver: true,
  }).start();

  const bubbleStyle = {
    transform: [
      { translateY: bubbleAnimationY },
      { translateX: bubbleAnimationX },
    ],
  };

  return (
    <View style={styles.levelContainer}>
      <View style={styles.levelTube}>
        <View style={styles.center} />
        <Animated.View style={[styles.bubble, bubbleStyle]} />
      </View>
      <Text style={styles.angleText}>{`X-axis: ${tilt.x.toFixed(
        2
      )}°, Y-axis: ${tilt.y.toFixed(2)}°`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  levelContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  levelTube: {
    width: 200,
    height: 200,
    backgroundColor: "#ccc",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  center: {
    backgroundColor: "red",
    height: 5,
    width: 5,
    borderRadius: 5,
    position: "absolute",
    zIndex: 99,
  },
  bubble: {
    width: 30,
    height: 30,
    backgroundColor: "blue",
    borderRadius: 15,
    position: "absolute",
  },
  angleText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LevelScreen;
