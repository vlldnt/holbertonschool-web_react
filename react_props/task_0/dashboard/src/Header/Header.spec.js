import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header component", () => {
  test("renders without crashing", () => {
    render(<Header />);
    const title = screen.getByText(/school dashboard/i);
    expect(title).toBeInTheDocument();
  });
});
