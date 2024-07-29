import { StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type CardProps = {
  progress: SharedValue<number>;
  index: number;
};

const Card = ({ progress, index }: CardProps) => {
  const rStyle = useAnimatedStyle(() => {
    const translateX = interpolate(progress.value, [0, 1], [0, index * 25]);

    const translateY = interpolate(progress.value, [0, 1], [0, -index * 5]);

    const rotate = interpolate(
      progress.value,
      [0, 1],
      [-index * 10, index * 10]
    );

    return {
      transform: [
        { translateX }, // 0 -> index * 25
        { translateY }, // 0 -> -index * 5
        { rotate: `${rotate}deg` }, // `${index * 10}deg`
      ],
    };
  }, []);

  return (
    <Animated.View
      style={[
        styles.card,
        rStyle,
        {
          zIndex: -index,
        },
      ]}
    />
  );
};

export default function index() {
  const progress = useSharedValue(0);

  return (
    <SafeAreaView
      style={styles.container}
      onTouchStart={() => {
        progress.value = withSpring(1, { mass: 2 });
      }}
      onTouchEnd={() => {
        progress.value = withSpring(0);
      }}
    >
      {new Array(4).fill(null).map((_, index) => {
        return <Card key={index} progress={progress} index={index} />;
      })}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0dada",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    height: 180,
    backgroundColor: "#fff",
    aspectRatio: 3 / 4,
    borderRadius: 25,
    borderCurve: "continuous",
    elevation: 3,
    shadowColor: "#cccccc",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    borderWidth: 1,
    borderColor: "#d1caca",
    position: "absolute",
  },
});
