import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import AddDestinationScreen from "../AddDestinationScreen";
import { DestinationContext } from "../../store/context/DestinationContext";
import { ThemeContext } from "../../store/context/ThemContext";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

const mockTheme = {
  colors: {
    background: "#ffffff",
    text: "#000000",
    cardBackground: "#f5f5f5",
    buttonBackground: "#6200ee",
    buttonText: "#ffffff",
  },
};

const mockAddDestination = jest.fn();

jest.mock("expo-image-picker", () => ({
  requestMediaLibraryPermissionsAsync: jest.fn(),
  launchImageLibraryAsync: jest.fn(),
}));

jest.spyOn(Alert, "alert");

describe("AddDestinationScreen Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("validates the form and submits correctly", async () => {
    // Mock image picker permissions and result
    ImagePicker.requestMediaLibraryPermissionsAsync.mockResolvedValue({
      status: "granted",
    });
    ImagePicker.launchImageLibraryAsync.mockResolvedValue({
      canceled: false,
      assets: [{ uri: "https://example.com/image.png" }],
    });

    const { getByPlaceholderText, getByText } = render(
      <DestinationContext.Provider
        value={{ addDestination: mockAddDestination }}
      >
        <ThemeContext.Provider value={{ colors: mockTheme.colors }}>
          <AddDestinationScreen navigation={{ goBack: jest.fn() }} />
        </ThemeContext.Provider>
      </DestinationContext.Provider>
    );

    // Find input fields and button
    const titleInput = getByPlaceholderText("Title");
    const descriptionInput = getByPlaceholderText("Description");
    const imageButton = getByText("Pick an image from camera roll");
    const submitButton = getByText("Add Destination");

    // Simulate picking an image
    await act(async () => {
      fireEvent.press(imageButton);
    });

    // Simulate user input
    await act(async () => {
      fireEvent.changeText(titleInput, "Test Destination");
      fireEvent.changeText(descriptionInput, "This is a test destination");
    });

    // Simulate form submission
    await act(async () => {
      fireEvent.press(submitButton);
    });

    // Check if the addDestination function was called with the correct data
    expect(mockAddDestination).toHaveBeenCalledWith({
      title: "Test Destination",
      description: "This is a test destination",
      image: "https://example.com/image.png",
    });
  });

  it("shows validation errors for invalid inputs", async () => {
    const { getByPlaceholderText, getByText } = render(
      <DestinationContext.Provider
        value={{ addDestination: mockAddDestination }}
      >
        <ThemeContext.Provider value={{ colors: mockTheme.colors }}>
          <AddDestinationScreen navigation={{ goBack: jest.fn() }} />
        </ThemeContext.Provider>
      </DestinationContext.Provider>
    );

    // Find input fields and button
    const titleInput = getByPlaceholderText("Title");
    const descriptionInput = getByPlaceholderText("Description");
    const submitButton = getByText("Add Destination");

    // Simulate invalid user input
    await act(async () => {
      fireEvent.changeText(titleInput, ""); // Empty title
      fireEvent.changeText(descriptionInput, ""); // Empty description
      fireEvent.press(submitButton);
    });

    // Check if validation errors are displayed
    expect(getByText("Title is required")).toBeTruthy();
    expect(getByText("Description is required")).toBeTruthy();
  });

  it("shows an alert if permission is denied", async () => {
    ImagePicker.requestMediaLibraryPermissionsAsync.mockResolvedValue({
      status: "denied",
    });

    const { getByText } = render(
      <DestinationContext.Provider
        value={{ addDestination: mockAddDestination }}
      >
        <ThemeContext.Provider value={{ colors: mockTheme.colors }}>
          <AddDestinationScreen navigation={{ goBack: jest.fn() }} />
        </ThemeContext.Provider>
      </DestinationContext.Provider>
    );

    const imageButton = getByText("Pick an image from camera roll");

    // Simulate picking an image
    await act(async () => {
      fireEvent.press(imageButton);
    });

    // Check if the alert is shown
    expect(Alert.alert).toHaveBeenCalledWith(
      "Permission Denied",
      "You need to grant storage permission to use this app"
    );
  });
});
