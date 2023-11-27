import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
  Layout,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import * as Haptics from 'expo-haptics';


const useSwitchBtn = () => {
  const [toggle, setToggle] = useState(true);
  const translate = useSharedValue(4);

  const Switchbtn = ({ setStickers, setActive }) => {


    useEffect(() => {
      if (toggle) {
        translate.value = withSpring(4);
        // setStickers([])
      } else {
        translate.value = withSpring(17);
      }
    }, [toggle]);

    return (
      <Pressable
        onPress={() => {
          setToggle(!toggle);
          setStickers([]);
          setActive(null);
          Haptics.selectionAsync()
        }}
        style={{
          width: 36,
          height: 20,
          backgroundColor: toggle ? "#CCD3E6" : "#3EB68F",
          borderRadius: 10,
          justifyContent: "center",
        }}
      >
        {/* SMAll BULB */}
        <Animated.View
          style={{
            width: 15,
            height: 15,
            backgroundColor: "white",
            borderRadius: 15,
            transform: [{ translateX: translate }],
          }}
        ></Animated.View>
      </Pressable>
    );
  };

  return { Switchbtn, toggle };
};

export default useSwitchBtn;

const styles = StyleSheet.create({});
