import React from "react";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";

function useShareSticker() {
  const [status, requestPermission] = MediaLibrary.usePermissions();

  const getViewShot = useCallback(
    async (result) => {
      const date = new Date();
      try {
        const uri = await captureRef(viewRef, {
          format: "png",
          quality: 0.8,
          fileName: `STICKER - ${date.valueOf()}`,
          ...(result ? { result } : {}),
        });
        return uri;
      } catch (error) {}
    },
    [viewRef]
  );

  const downloadToLocal = useCallback(async () => {
    const url = await getViewShot();
    if (!url) {
      Alert.alert("Oops, An error occurred.");
      return;
    }
    await MediaLibrary.saveToLibraryAsync(url);
    
  }, [getViewShot, viewRef]);

  const shareOpenMore = useCallback(async () => {
    const url = await getViewShot();
    try {
      const ShareResponse = await Share.open({
        title: `STICKER`,
        message: `Send Receipt`,
        url,
      });
      console.log("shareOpenMore Result =>", ShareResponse);
    } catch (error) {
      console.log("shareOpenMore Error =>", error);
    }
  }, [getViewShot]);

  return {
    downloadToLocal,
    shareOpenMore
  }
}

export default useShareSticker;
