import React from "react";
// import { renderHook, act } from "@testing-library/react-hooks";
import { DestinationProvider, DestinationContext } from "../DestinationContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { act, renderHook, waitFor } from "@testing-library/react-native";
// Mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));
describe("DestinationContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllMocks();
    AsyncStorage.getItem.mockResolvedValue(null);
  });
  it("adds a new destination and updates the list", async () => {
    const wrapper = ({ children }) => (
      <DestinationProvider>{children}</DestinationProvider>
    );
    const { result } = renderHook(() => React.useContext(DestinationContext), {
      wrapper,
    });
    // Add a new destination
    const newDestination = {
      title: "Test Destination",
      description: "This is a test destination",
      image: "https://example.com/image.png",
    };
    await act(async () => {
      result.current.addDestination(newDestination);
    });
    // Check if the destination was added
    expect(result.current.destinations).toContainEqual(newDestination);
    // Check if AsyncStorage.setItem was called
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "destinations",
      JSON.stringify([newDestination])
    );
  });
  it("loads destinations from AsyncStorage on initial render", async () => {
    const mockDestinations = [
      {
        title: "Test Destination 1",
        description: "This is test destination 1",
        image: "https://example.com/image1.png",
      },
      {
        title: "Test Destination 2",
        description: "This is test destination 2",
        image: "https://example.com/image2.png",
      },
    ];
    // Mock AsyncStorage.getItem to return the mock destinations
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(mockDestinations));
    const wrapper = ({ children }) => (
      <DestinationProvider>{children}</DestinationProvider>
    );
    const { result } = renderHook(() => React.useContext(DestinationContext), {
      wrapper,
    });
    // Wait for the context to load destinations from AsyncStorage
    await waitFor(() => {
      expect(result.current.destinations).toEqual(mockDestinations);
    });
    // Check if the destinations were loaded
    expect(result.current.destinations).toEqual(mockDestinations);
  });
  it("saves destinations to AsyncStorage when a new destination is added", async () => {
    const wrapper = ({ children }) => (
      <DestinationProvider>{children}</DestinationProvider>
    );
    const { result } = renderHook(() => React.useContext(DestinationContext), {
      wrapper,
    });
    // Add a new destination
    const newDestination = {
      title: "Test Destination",
      description: "This is a test destination",
      image: "https://example.com/image.png",
    };
    await act(async () => {
      result.current.addDestination(newDestination);
    });
    // Check if AsyncStorage.setItem was called with the updated list
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "destinations",
      JSON.stringify([newDestination])
    );
  });
});
