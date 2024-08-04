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
      radius: 50, 
      notifyOnEnter: true,
      notifyOnExit: true,
    },
      // test home 
      // {
      //   latitude: -1.9396815039098625,
      //   longitude:  30.119462949011755,
      //   radius: 50, 
      //   notifyOnEnter: true,
      //   notifyOnExit: true,
      // },
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
  };

  useEffect(() => {
    (async () => {
      try {
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
            setLocationHistory((prev) => [...prev, { latitude, longitude }]);
          }
        );

        return () => {
          locationSubscription.remove();
        };
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  // useEffect(() => {
  //   checkGeofence();
  // }, [location]);

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
        {location && (
          <Marker
            coordinate={location}
            title="My location"
            description="This is where you're currently located"
          />
        )}
        <Polyline
          coordinates={locationHistory}
          strokeColor="#000"
          strokeWidth={6}
        />
        {geofences.map((geofence, index) => (
          <Circle
            key={index}
            center={{
              latitude: geofence.latitude,
              longitude: geofence.longitude,
            }}
            radius={geofence.radius}
            fillColor="rgba(0, 0, 255, 0.1)"
            strokeColor="rgba(0, 0, 255, 0.5)"
            strokeWidth={2}
          />
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
