import { render, screen } from "@testing-library/react";
import Login from "./Login";

describe("Login component", () => {
  test("renders without crashing", () => {
    render(<Login />);
    const loginText = screen.getByText(/login to access the full dashboard/i);
    expect(loginText).toBeInTheDocument();
  });
});
