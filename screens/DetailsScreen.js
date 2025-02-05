import { useContext, useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ThemeContext } from "../store/context/ThemContext";

function DetailsScreen({ route }) {
  const { destination } = route.params;
  const { colors } = useContext(ThemeContext);
  const opacity = useSharedValue(0);
  useEffect(() => {
    opacity.value = withTiming(1, { duration: 500 });
  }, []);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Animated.View style={[styles.content, animatedStyle]}>
        <Image style={styles.image} source={{ uri: destination.image }} />
        <Text style={[styles.title, { color: colors.text }]}>
          {destination.title}
        </Text>
        <Text style={[styles.description, { color: colors.text }]}>
          {destination.description}
        </Text>
      </Animated.View>
    </View>
  );
}
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
