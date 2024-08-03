import { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { LightSensor } from "expo-sensors";
import Toast from "react-native-toast-message";

const Light = () => {
  const [lightIntensity, setLightIntensity] = useState<number | null>(null);

  useEffect(() => {
    LightSensor.requestPermissionsAsync();
    LightSensor.setUpdateInterval(1000);
    const subscription = LightSensor.addListener(({ illuminance }) => {
      setLightIntensity(illuminance);
    });
    return () => {
      subscription.remove();
    };
  }, []);

  const getIntensityStatus = () => {
    if (lightIntensity === null) return "gray"; // Default color
    if (lightIntensity < 50) {
      Toast.hide();
      console.log("tast");
      Toast.show({
        text1: "Low light",
        type: "info",
        visibilityTime: 2000,
      });
      return;
    }
    if (lightIntensity >= 50 && lightIntensity < 200) {
      Toast.hide();
      Toast.show({
        text1: "Moderate light",
        type: "info",
        visibilityTime: 2000,
      });
      return;
    }
    Toast.hide();
    Toast.show({
      text1: "High light",
      type: "error",
      visibilityTime: 2000,
    });
    return;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Light Intensity: {lightIntensity}</Text>
      <View
        style={[
          styles.lightIndicator,
          { backgroundColor: getColor(lightIntensity) },
        ]}
      />
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          backgroundColor: "#000068",
          bottom: 10,
          paddingVertical: 10,
          width: "50%",
          alignItems: "center",
        }}
        onPress={() => getIntensityStatus()}
      >
        <Text style={{ color: "white" }}>Light Intensity status</Text>
      </TouchableOpacity>
    </View>
  );
};

const getColor = (intensity: number | null) => {
  if (intensity === null) return "gray";
  if (intensity < 50) {
    Toast.hide();
    return "yellow";
  }
  if (intensity >= 50 && intensity < 200) {
    return "orange";
  }
  return "red";
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  lightIndicator: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 50,
  },
});

export default Light;
