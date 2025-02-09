import { render, waitFor, fireEvent } from "@testing-library/react-native";
import HomeScreen from "../HomeScreen";
import { DestinationContext } from "../../store/context/DestinationContext";
import { ThemeContext } from "../../store/context/ThemContext";

// Mock data
const mockDestinations = [
  {
    title: "Mock Destination 1",
    image: "mockImage1.png",
    description: "Mock Description 1",
  },
  {
    title: "Mock Destination 2",
    image: "mockImage2.png",
    description: "Mock Description 2",
  },
];

const mockTheme = {
  colors: {
    background: "#ffffff",
    cardBackground: "#f0f0f0",
    text: "#000000",
  },
};

const mockFetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          name: { common: "Country 1" },
          flags: { png: "flag1.png" },
          capital: "Capital 1",
          region: "Region 1",
        },
        {
          name: { common: "Country 2" },
          flags: { png: "flag2.png" },
          capital: "Capital 2",
          region: "Region 2",
        },
      ]),
  })
);

global.fetch = mockFetch;

describe("HomeScreen", () => {
  it("renders loading state correctly", () => {
    const { getByTestId } = render(
      <ThemeContext.Provider value={mockTheme}>
        <DestinationContext.Provider value={{ destinations: [] }}>
          <HomeScreen />
        </DestinationContext.Provider>
      </ThemeContext.Provider>
    );

    expect(getByTestId("loading-indicator")).toBeTruthy();
  });

  it("renders error state correctly", async () => {
    mockFetch.mockImplementationOnce(() =>
      Promise.reject(new Error("Network Error"))
    );

    const { getByText } = render(
      <ThemeContext.Provider value={mockTheme}>
        <DestinationContext.Provider value={{ destinations: [] }}>
          <HomeScreen />
        </DestinationContext.Provider>
      </ThemeContext.Provider>
    );

    await waitFor(() => expect(getByText("Error: Network Error")).toBeTruthy());
  });

  it("renders list of destinations correctly", async () => {
    const { getByText } = render(
      <ThemeContext.Provider value={mockTheme}>
        <DestinationContext.Provider value={{ destinations: mockDestinations }}>
          <HomeScreen />
        </DestinationContext.Provider>
      </ThemeContext.Provider>
    );

    await waitFor(() => {
      expect(getByText("Mock Destination 1")).toBeTruthy();
      expect(getByText("Mock Destination 2")).toBeTruthy();
      expect(getByText("Country 1")).toBeTruthy();
      expect(getByText("Country 2")).toBeTruthy();
    });
  });

  it("navigates to details screen on card press", async () => {
    const mockNavigate = jest.fn();
    const { getByText } = render(
      <ThemeContext.Provider value={mockTheme}>
        <DestinationContext.Provider value={{ destinations: mockDestinations }}>
          <HomeScreen navigation={{ navigate: mockNavigate }} />
        </DestinationContext.Provider>
      </ThemeContext.Provider>
    );

    await waitFor(() => {
      fireEvent.press(getByText("Mock Destination 1"));
      expect(mockNavigate).toHaveBeenCalledWith("Details", {
        destination: mockDestinations[0],
      });
    });
  });
});
