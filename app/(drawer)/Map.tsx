import React, { useEffect, useState } from "react";
import MapView, {
  Marker,
  Polyline,
  PROVIDER_GOOGLE,
  Circle,
} from "react-native-maps";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import * as Location from "expo-location";
import Haversine from "haversine";
import Toast from "react-native-toast-message";

const Map = () => {
  const { height, width } = useWindowDimensions();
  const ASPECT_RATIO = width / height;

  const geofences = [
    {
      latitude: -1.9555556869345836,
      longitude: 30.104252198149002,
      radius: 80,
      notifyOnEnter: true,
      notifyOnExit: true,
      label: "AUCA fences",
    },
    {
      latitude: -1.9396815039098625,
      longitude: 30.119462949011755,
      radius: 50,
      notifyOnEnter: true,
      notifyOnExit: true,
      label: "Home fences",
    },
  ];

  const [location, setLocation] = useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  const [locationHistory, setLocationHistory] = useState<any[]>([]);

  const BUFFER_DISTANCE = 5;

  const checkGeofence = () => {
    try {
      const distance = Haversine(
        { latitude: geofences[0].latitude, longitude: geofences[0].longitude },
        { latitude: location.latitude, longitude: location.longitude },
        { unit: "meter" }
      );

      const inGeofence = distance <= geofences[0].radius + BUFFER_DISTANCE;

      console.log(`Distance to geofence: ${distance.toFixed(2)} meters`);

      if (inGeofence) {
        console.log("You're in the region");
        Toast.show({
          type: "success",
          text1: "You're in the region",
          autoHide: true,
        });
      } else {
        console.log("You're out of the region");
        Toast.show({
          type: "error",
          text1: `You're out of the region, exactly at ${distance.toFixed(
            2
          )} meters of the geofence`,
          autoHide: true,
        });
      }
    } catch (error) {
      console.error("Error checking geofence: ", error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        console.log("Requesting location permissions...");
        let { status } = await Location.requestForegroundPermissionsAsync();
        const { status: backgroundStatus } =
          await Location.requestBackgroundPermissionsAsync();
        if (status !== "granted" || backgroundStatus !== "granted") {
          console.log("Permissions not granted");
          await Location.requestForegroundPermissionsAsync();
          await Location.requestBackgroundPermissionsAsync();
          return;
        }

        console.log("Getting current location...");
        let location = await Location.getCurrentPositionAsync({});
        setLocation({
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0922 * ASPECT_RATIO,
        });

        console.log("Subscribing to location updates...");
        const locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.Highest,
            timeInterval: 10000,
            distanceInterval: 10,
          },
          (newLocation) => {
            console.log("Location updated: ", newLocation);
            const { latitude, longitude } = newLocation.coords;
            setLocation({
              latitude,
              longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0922 * ASPECT_RATIO,
            });
            setLocationHistory((prev) => [...prev, { latitude, longitude }]);
          }
        );

        return () => {
          console.log("Removing location subscription...");
          locationSubscription.remove();
        };
      } catch (error) {
        console.error("Error during location updates: ", error);
      }
    })();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#F4F4F4" }}>
      <MapView
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        showsMyLocationButton
        initialRegion={{
          longitude: 30.104252198149002,
          latitude: -1.9555556869345836,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0922 * ASPECT_RATIO,
        }}
        showsUserLocation
      >
        <Polyline
          coordinates={locationHistory}
          strokeColor="#000"
          strokeWidth={6}
        />
        {geofences.map((geofence, index) => (
          <View key={index}>
            <Circle
              center={{
                latitude: geofence.latitude,
                longitude: geofence.longitude,
              }}
              radius={geofence.radius}
              fillColor="rgba(255, 0, 0, 0.1)"
              strokeColor="rgba(0, 0, 255, 0.5)"
              strokeWidth={2}
            />
            <Marker
              coordinate={{
                longitude: geofence.longitude,
                latitude: geofence.latitude,
              }}
              title={geofence.label}
              description="This is one of the fences"
            />
          </View>
        ))}
      </MapView>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          position: "absolute",
          backgroundColor: "#000068",
          bottom: 10,
          paddingVertical: 10,
          width: "50%",
          alignItems: "center",
          alignSelf: "center",
        }}
        onPress={checkGeofence}
      >
        <Text style={{ color: "white" }}>GeoFence status</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Map;
