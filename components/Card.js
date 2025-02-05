import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
const Card = ({ title, description, image, onPress, style, textStyle }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.card, style]}>
        <Image source={{ uri: image }} style={styles.image} />
        <Text style={[styles.title, textStyle]}>{title}</Text>
        <Text style={[styles.description, textStyle]}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    margin: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
});
export default Card;
