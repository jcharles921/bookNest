import React, { useEffect, useState } from "react";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
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
      latitude: -1.94995,
      longitude: 30.05885,
      radius: 100,
      notifyOnEnter: true,
      notifyOnExit: true,
    },
  ];

  const [location, setLocation] = useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  const [locationHistory, setLocationHistory] = useState<any[]>([]);

  const isInGeofence = geofences.some((geofence) => {
    const distance = Haversine(geofence, {
      longitude: location.longitude,
      latitude: location.latitude,
    });
    return distance <= geofence.radius;
  });

  const inRegion = () => {
    const distance = Haversine(geofences[0], {
      longitude: location.longitude,
      latitude: location.latitude,
    });
    if (distance <= geofences[0].radius) {
      Toast.show({
        type: "success",
        text1: "You're in region",
        autoHide: true,
      });
    }
    if (distance > geofences[0].radius) {
      Toast.show({
        type: "error",
        text1: "You're out of region",
        autoHide: true,
      });
    }
  };

  setTimeout(() => {
    inRegion();
  }, 30000);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      const { status: backgroundStatus } =
        await Location.requestBackgroundPermissionsAsync();
      if (status !== "granted" || backgroundStatus !== "granted") {
        await Location.requestForegroundPermissionsAsync();
        await Location.requestBackgroundPermissionsAsync();
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0922 * ASPECT_RATIO,
      });

      // Track location updates
      const locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Highest,
          timeInterval: 10000, // Update every 10 seconds
          distanceInterval: 10, // Update every 10 meters
        },
        (newLocation) => {
          const { latitude, longitude } = newLocation.coords;
          setLocation({
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0922 * ASPECT_RATIO,
          });
          setLocationHistory((prev) => [
            ...prev,
            { latitude, longitude },
          ]);
        }
      );

      return () => {
        locationSubscription.remove();
      };
    })();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#F4F4F4" }}>
      <MapView
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        showsMyLocationButton
        initialRegion={{
          longitude: 30.05885,
          latitude: -1.94995,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0922 * ASPECT_RATIO,
        }}
        showsUserLocation
      >
        {location && (
          <Marker
            coordinate={location}
            title="My location"
            description="This is where you're currently located"
          />
        )}
        <Polyline
          coordinates={locationHistory}
          strokeColor="#000" // Change this to your desired color
          strokeWidth={6}
        />
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
        onPress={() => inRegion()}
      >
        <Text style={{ color: "white" }}>GeoFence status</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Map;
