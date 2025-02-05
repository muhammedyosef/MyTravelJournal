import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import AddDestinationScreen from "./screens/AddDestinationScreen";
import IconButton from "./components/IconButton";
import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";
import { ThemeContext } from "./store/context/ThemContext";
import { StatusBar } from "expo-status-bar";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { colors, toggleTheme, isDarkMode } = useContext(ThemeContext);
  return (
    <>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.headerBackground,
            },
            headerTintColor: colors.headerText,
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
              title: "Destinations",
              headerRight: ({ tintColor }) => (
                <>
                  <IconButton
                    icon={isDarkMode ? "sunny" : "moon"}
                    size={24}
                    color={tintColor}
                    onPress={toggleTheme}
                  />
                  <IconButton
                    icon="add"
                    size={24}
                    color={tintColor}
                    onPress={() => navigation.navigate("AddDestination")}
                  />
                </>
              ),
            })}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{
              title: "Details",
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon={isDarkMode ? "sunny" : "moon"}
                  size={24}
                  color={tintColor}
                  onPress={toggleTheme}
                />
              ),
            }}
          />
          <Stack.Screen
            name="AddDestination"
            component={AddDestinationScreen}
            options={{
              title: "Add Destination",
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon={isDarkMode ? "sunny" : "moon"}
                  size={24}
                  color={tintColor}
                  onPress={toggleTheme}
                />
              ),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default AppNavigator;
