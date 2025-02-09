import React from "react";
import { renderHook, act } from "@testing-library/react-native";
import { ThemeProvider, ThemeContext } from "../ThemContext";
describe("ThemeContext", () => {
  it("provides the correct theme colors and toggle functionality", () => {
    const wrapper = ({ children }) => <ThemeProvider>{children}</ThemeProvider>;
    const { result } = renderHook(() => React.useContext(ThemeContext), {
      wrapper,
    });
    // Check initial theme (light mode)
    expect(result.current.isDarkMode).toBe(false);
    expect(result.current.colors.background).toBe("#ffffff");
    expect(result.current.colors.text).toBe("#000000");
    // Toggle to dark mode
    act(() => {
      result.current.toggleTheme();
    });
    // Check updated theme (dark mode)
    expect(result.current.isDarkMode).toBe(true);
    expect(result.current.colors.background).toBe("#121212");
    expect(result.current.colors.text).toBe("#ffffff");
    // Toggle back to light mode
    act(() => {
      result.current.toggleTheme();
    });
    // Check updated theme (light mode)
    expect(result.current.isDarkMode).toBe(false);
    expect(result.current.colors.background).toBe("#ffffff");
    expect(result.current.colors.text).toBe("#000000");
  });
});
