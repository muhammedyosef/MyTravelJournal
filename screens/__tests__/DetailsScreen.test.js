import React from "react";

import { render, act, waitFor, fireEvent } from "@testing-library/react-native";
import DetailsScreen from "../DetailsScreen";
import { ThemeContext } from "../../store/context/ThemContext";

// Mock react-native-reanimated
jest.mock("react-native-reanimated", () => {
  const Reanimated = jest.requireActual("react-native-reanimated/mock");

  Reanimated.useSharedValue = (initValue) => ({
    value: initValue,
  });

  Reanimated.useAnimatedStyle = (fn) => fn();

  Reanimated.withTiming = (value, config, callback) => {
    if (callback) {
      callback(true); // Call the callback immediately to simulate animation end
    }
    return { value }; // Immediately return the value
  };

  return Reanimated;
});

describe("DetailsScreen Component", () => {
  const mockDestination = {
    title: "Test Destination",
    description: "This is a test destination",
    image: "https://example.com/image.png",
  };
  const mockTheme = {
    colors: {
      background: "#ffffff",
      text: "#000000",
    },
  };
  it("renders the destination details correctly", () => {
    const { getByText, getByTestId } = render(
      <ThemeContext.Provider value={{ colors: mockTheme.colors }}>
        <DetailsScreen route={{ params: { destination: mockDestination } }} />
      </ThemeContext.Provider>
    );
    // Check if the title, description, and image are rendered
    expect(getByText(mockDestination.title)).toBeTruthy();
    expect(getByText(mockDestination.description)).toBeTruthy();
    expect(getByTestId("details-image").props.source.uri).toBe(
      mockDestination.image
    );
  });
  it("applies the correct theme colors", () => {
    const { getByTestId } = render(
      <ThemeContext.Provider value={{ colors: mockTheme.colors }}>
        <DetailsScreen route={{ params: { destination: mockDestination } }} />
      </ThemeContext.Provider>
    );
    // Check if the background and text colors are applied
    const container = getByTestId("details-container");
    const title = getByTestId("details-title");
    const description = getByTestId("details-description");
    expect(container.props.style[1].backgroundColor).toBe(
      mockTheme.colors.background
    );
    expect(title.props.style[1].color).toBe(mockTheme.colors.text);
    expect(description.props.style[1].color).toBe(mockTheme.colors.text);
  });
});
