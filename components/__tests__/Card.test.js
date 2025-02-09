import Card from "../Card";
import { render } from "@testing-library/react-native";

describe("Card Component", () => {
  it("renders the title and the Image correctly", () => {
    const mockData = {
      title: "Test Destination",
      image: "https://example.com/image.png",
    };
    const { getByText, getByTestId } = render(
      <Card title={mockData.title} image={mockData.image} />
    );
    expect(getByText(mockData.title)).toBeTruthy();
    expect(getByTestId("card-image").props.source.uri).toBe(mockData.image);
  });
});
