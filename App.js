import { DestinationProvider } from "./store/context/DestinationContext";
import { ThemeProvider } from "./store/context/ThemContext";
import AppNavigator from "./AppNavigator";

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
