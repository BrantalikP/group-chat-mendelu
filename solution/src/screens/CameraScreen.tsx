import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Camera, CameraView, CameraType } from "expo-camera";
import { Redirect, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { sendMessageToFirestore } from "~/hooks/useChat";
import * as Haptics from "expo-haptics";
import { uploadImageAsync } from "~/hooks/useImage";

export const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraType, setCameraType] = useState<CameraType>("back");
  const cameraRef = useRef<CameraView>(null);

  const requestPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };

  useEffect(() => {
    void requestPermission();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();

      if (!photo?.uri) return;
      try {
        const downloadURL = await uploadImageAsync(photo.uri);

        sendMessageToFirestore({ image: downloadURL, text: "" });
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
        router.back();
      } catch (error) {
        console.error("Image upload failed: ", error);
      }
    }
  };

  const toggleCameraType = () => {
    setCameraType((prevType) => (prevType === "back" ? "front" : "back"));
  };

  if (hasPermission === null) {
    return (
      <View style={styles.centered}>
        <Text>Requesting permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) return <Redirect href="/" />;

  return (
    <CameraView style={{ flex: 1 }} facing={cameraType} ref={cameraRef}>
      <View style={styles.headerControls}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => router.back()}
        >
          <Ionicons name={"close"} size={24} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={toggleCameraType}
        >
          <Ionicons name={"camera-reverse"} size={24} color={"white"} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.controlButton, styles.snapContainer]}
        onPress={takePicture}
      >
        <View style={styles.snapButton} />
      </TouchableOpacity>
    </CameraView>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    marginTop: 60,
  },
  controlButton: {
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 10,
    borderRadius: 50,
  },
  snapContainer: {
    bottom: 40,
    position: "absolute",
    alignSelf: "center",
  },
  snapButton: {
    backgroundColor: "red",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
