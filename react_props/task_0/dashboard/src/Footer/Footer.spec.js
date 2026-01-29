import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer component", () => {
  test("renders without crashing", () => {
    render(<Footer />);
    const copyright = screen.getByText(/copyright/i);
    expect(copyright).toBeInTheDocument();
  });
});
