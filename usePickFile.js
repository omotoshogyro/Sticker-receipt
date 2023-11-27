import { StyleSheet, Text, View } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";

const usePickFile = () => {
  const pickFile = () => {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (result.canceled) return;
        const file = result?.assets[0];
        resolve({ file: file.uri, type: file.type, size: file.fileSize });
      } catch (error) {
        reject(error);
      }
    });
  };

  return pickFile;
};

export default usePickFile;

const styles = StyleSheet.create({});
