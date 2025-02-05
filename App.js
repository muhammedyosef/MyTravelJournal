import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { DestinationProvider } from "./store/context/DestinationContext";
import { ThemeContext, ThemeProvider } from "./store/context/ThemContext";
import AppNavigator from "./AppNavigator";

const Stack = createStackNavigator();
export default function App() {
  return (
    <>
      <ThemeProvider>
        <DestinationProvider>
          <AppNavigator />
        </DestinationProvider>
      </ThemeProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
