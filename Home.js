import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Switch,
  TouchableOpacity,
  Pressable,
  FlatList,
  Alert,
} from "react-native";
import { Image as STImage } from "expo-image";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import React, { useCallback, useState, useRef } from "react";
import Asseticon from "./Asseticon";
import Bgicon from "./Bgicon";
import usePickFile from "./usePickFile";
import Animated, {
  Layout,
  SlideInDown,
  SlideOutDown,
  SlideOutUp,
  useSharedValue,
} from "react-native-reanimated";
import useSwitchBtn from "./useSwitchBtn";
import Checkicon from "./Checkicon";
import Receipt1 from "./Receipt1";
import Receipt2 from "./Receipt2";
import Receipt3 from "./Receipt3";
import { captureRef } from "react-native-view-shot";
import * as Haptics from "expo-haptics";

const Button = ({ btnText, btnAction, light = true }) => {
  return (
    <TouchableOpacity
      onPress={btnAction}
      activeOpacity={0.8}
      style={{
        paddingHorizontal: 24,
        paddingVertical: 12,
        backgroundColor: light ? "#F5F7FC" : "#000",
        borderRadius: 32,
        flex: 1,
        alignItems: "center",
      }}
    >
      <Text style={{ color: light ? "#000" : "white", textAlign: "center" }}>
        {btnText}
      </Text>
    </TouchableOpacity>
  );
};

const ImagePreview = ({ uri, setActive, active }) => {
  let isActive = uri == active;

  let toggleActive = (uri) => {
    setActive(uri);
    console.log("yayyy", uri);
  };

  return (
    <Pressable onPress={() => toggleActive(uri)}>
      <STImage
        contentFit="cover"
        source={uri}
        style={{
          height: 48,
          width: 56,
          borderColor: isActive ? "#00A1FB" : "transparent",
          borderWidth: 1,
          borderRadius: 8,
        }}
      />
      {isActive && (
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Checkicon />
        </View>
      )}
    </Pressable>
  );
};

const Home = () => {
  const pickFile = usePickFile();
  const [stickers, setStickers] = useState([]);
  const [show, setShow] = useState(false);
  const { Switchbtn, toggle } = useSwitchBtn();
  const [active, setActive] = useState(null);
  const translate = useSharedValue(0);
  const [showToast, setShowToast] = useState(false);

  const viewRef = useRef(null);

  const getViewShot = useCallback(
    async (result) => {
      const randomNumber = Math.floor(Math.random() * 100);
      try {
        const uri = await captureRef(viewRef, {
          format: "png",
          quality: 1,
          fileName: `STICKER-${randomNumber}`,
          ...(result ? { result } : {}),
        });
        return uri;
      } catch (error) {
        console.log(error);
      }
    },
    [viewRef]
  );

  const downloadToLocal = useCallback(async () => {
    setShowToast(true);
    const url = await getViewShot();
    if (!url) {
      Alert.alert("Oops, An error occurred.");
      return;
    }
    await MediaLibrary.saveToLibraryAsync(url);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert("Downloaded!!")
  }, [getViewShot, viewRef]);

  const shareOpenMore = useCallback(async () => {
    const url = await getViewShot();
    try {
      const ShareResponse = await Sharing.shareAsync(url, {
        dialogTitle: "Sticker",
      });
    } catch (error) {
      console.log(error);
    }
  }, [getViewShot]);

  let subHeader = !toggle
    ? "Make it memorable, set the mood and add personality to the receipt ."
    : "Set the mood, add personality to the receipt from avatars to pictures.";
  let headerView = !toggle ? "Select Image" : "Add Image.";

  const ShownReceipt = ({ toggle }) => {
    if (toggle && stickers.length == 0) {
      return <Receipt2 />;
    } else if (toggle && stickers.length > 0) {
      return (
        <View style={{overflow: "hidden"}}>
          <View style={styles.stickerReceiptWrap}>
            <STImage
              contentFit="contain"
              source={active}
              style={styles.stickerImageWrap}
            />
          </View>
          <Receipt3 />
        </View>
      );
    } else {
      return <Receipt1 />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.mainWrap}>
        {/* BLOCK  */}
        <Animated.View layout={Layout.springify()} style={styles.blockWrap}>
          {/* RECEIPT VIEW */}
          <View style={styles.receiptView}>
            <View style={{ position: "absolute" }}>
              <Bgicon />
            </View>
            <View ref={viewRef}>
              <ShownReceipt toggle={!toggle} />
            </View>
          </View>

          {/* HORIZONTAL LINE */}
          <View style={styles.horizontalLine} />

          {/* UPLOADING SECTION HEADER */}
          <View style={{ rowGap: 6 }}>
            <Text style={styles.headerText}>{headerView}</Text>
            <View style={styles.subHeaderSwitchWrap}>
              <Text style={styles.subHeaderText}>{subHeader}</Text>
              <Switchbtn setActive={setActive} setStickers={setStickers} />
            </View>
          </View>

          {/* UPLOAD SECTUON BUTTON */}

          {!toggle && (
            <Animated.View
              layout={Layout.springify()}
              style={{ flexDirection: "row", columnGap: 8 }}
            >
              <TouchableOpacity
                layout={Layout.springify()}
                style={styles.uploadSectionBtn}
                activeOpacity={0.8}
                onPress={async () => {
                  const result = await pickFile();
                  setStickers([...stickers, result.file]);
                  console.log(
                    result,
                    stickers.length,
                    "here is the uploaded assets"
                  );
                }}
              >
                <Asseticon />

                {stickers?.length === 0 && (
                  <Text style={styles.chooseImageText}>
                    You currently have no image set, tap here to choose.
                  </Text>
                )}
              </TouchableOpacity>

              <View style={styles.barAndPreviewWrap}>
                {stickers?.length !== 0 && <View style={styles.barStyle} />}
                <FlatList
                  data={stickers}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    columnGap: 8,
                    paddingRight: stickers.length >= 4 ? 72 : 0,
                  }}
                  renderItem={({ item }) => (
                    <ImagePreview
                      uri={item}
                      active={active}
                      setActive={setActive}
                    />
                  )}
                  keyExtractor={(item) => item}
                />
              </View>
            </Animated.View>
          )}

          {/* BUTTONS WRAP */}
          <View style={styles.btnsWrap}>
            <Button btnText="Download" btnAction={downloadToLocal} />
            <Button
              btnText="Share Receipt"
              btnAction={shareOpenMore}
              light={false}
            />
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DDE3F1",
  },
  mainWrap: {
    flex: 1,
    paddingHorizontal: 19.5,
    paddingVertical: 6,
    justifyContent: "flex-end",
  },
  blockWrap: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 32,
    rowGap: 24,
    overflow: "hidden",
  },
  receiptView: {
    width: 322,
    minHeight: 203,
    borderRadius: 16,
    backgroundColor: "#F5F7FC",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  btnsWrap: {
    flexDirection: "row",
    columnGap: 24,
  },
  barStyle: {
    width: 1,
    backgroundColor: "#F3F6FD",
  },
  barAndPreviewWrap: {
    flexDirection: "row",
    columnGap: 8,
  },
  chooseImageText: {
    flex: 1,
    color: "#00A3FF",
    fontSize: 12,
    fontFamily: "Inter-Regular",
  },
  uploadSectionBtn: {
    flexDirection: "row",
    padding: 8,
    backgroundColor: "#F5F8FF",
    borderRadius: 8,
    columnGap: 12,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#91D7FF",
    flex: 1,
    justifyContent: "center",
    minWidth: 56,
  },
  headerText: {
    fontSize: 15,
    fontFamily: "Inter-Regular",
  },
  subHeaderText: {
    flex: 0.9,
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#4B4B4B",
  },
  subHeaderSwitchWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  horizontalLine: {
    height: 2,
    backgroundColor: "#fff",

    // SHADOW VALUES

    elevation: 5,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.1,
    shadowRadius: 0.5,
    borderRadius: 10,
  },
  stickerReceiptWrap: {
    position: "absolute",
    top: 135,
    right: 62,
    zIndex: 1,
    width: 80,
    height: 130,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden"
  },
  stickerImageWrap: {
    width: "100%",
    height: "100%",
  },
});
