import { fireEvent, render } from "@testing-library/react-native";
import Button from "../Button";

describe("Button Component", () => {
  it("renders the title and handles onPress events", () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <Button title="Click Me" onPress={mockOnPress} />
    );

    const button = getByText("Click Me");
    expect(button).toBeTruthy();

    fireEvent.press(button);

    expect(mockOnPress).toHaveBeenCalled();
  });
});
