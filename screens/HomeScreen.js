import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import Card from "../components/Card";
import { DestinationContext } from "../store/context/DestinationContext";
import { ThemeContext } from "../store/context/ThemContext";
const HomeScreen = ({ navigation }) => {
  const { destinations: userDestinations } = useContext(DestinationContext);
  const { colors } = useContext(ThemeContext);
  const [destinationsApi, setDestinationsApi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const formatedData = data.map((destination) => ({
          title: destination.name.common,
          image: destination.flags.png,
          description: `Capital: ${destination.capital}, Region: ${destination.region}`,
        }));

        setDestinationsApi(formatedData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);
  const allDestinations = [...userDestinations, ...destinationsApi];

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#0000ff"
        testID="loading-indicator"
      />
    );
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={allDestinations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Card
            title={item?.title}
            image={item?.image}
            onPress={() =>
              navigation.navigate("Details", { destination: item })
            }
            style={{ backgroundColor: colors.cardBackground }}
            textStyle={{ color: colors.text }}
          />
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
export default HomeScreen;
