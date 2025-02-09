import { useContext, useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { ThemeContext } from "../store/context/ThemContext";

const DetailsScreen = ({ route }) => {
  const DURATION = 1000;
  const DELAY = 500;

  const { destination } = route.params;
  const { colors } = useContext(ThemeContext);
  const opacity1 = useSharedValue(0);
  const opacity2 = useSharedValue(0);
  const opacity3 = useSharedValue(0);
  useEffect(() => {
    opacity1.value = withDelay(
      0 * DELAY,
      withTiming(1, { duration: DURATION })
    );
    opacity2.value = withDelay(
      1 * DELAY,
      withTiming(1, { duration: DURATION })
    );
    opacity3.value = withDelay(
      2 * DELAY,
      withTiming(1, { duration: DURATION })
    );
  }, []);
  const animatedStyle1 = useAnimatedStyle(() => {
    return { opacity: opacity1.value };
  });

  const animatedStyle2 = useAnimatedStyle(() => {
    return { opacity: opacity2.value };
  });

  const animatedStyle3 = useAnimatedStyle(() => {
    return { opacity: opacity3.value };
  });

  return (
    <View
      style={[styles.container, { backgroundColor: colors.background }]}
      testID="details-container"
    >
      <Animated.View style={[styles.content]}>
        <Animated.Image
          style={[styles.image, animatedStyle1]}
          source={{ uri: destination.image }}
          testID="details-image"
        />
        <Animated.Text
          style={[styles.title, { color: colors.text }, animatedStyle2]}
          testID="details-title"
        >
          {destination.title}
        </Animated.Text>
        <Animated.Text
          style={[styles.description, { color: colors.text }, animatedStyle3]}
          testID="details-description"
        >
          {destination.description}
        </Animated.Text>
      </Animated.View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
  },
});
export default DetailsScreen;
