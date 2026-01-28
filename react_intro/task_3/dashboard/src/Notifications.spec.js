import { render, screen, fireEvent } from "@testing-library/react";
import Notifications from "./Notifications";

describe("notification tests", () => {
  test("Existence of the notifications title", () => {
    render(<Notifications />);
    const titleElement = screen.getByText(/here is the list of notifications/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("Existence of three list items", () => {
    render(<Notifications />);
    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(3);
  });

  test("Existence of the button element", () => {
    render(<Notifications />);
    const buttonElement = screen.getByRole("button", { name: /close/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test("Logs message when close button is clicked", () => {
    const consoleLog = jest.spyOn(console, "log");
    render(<Notifications />);
    const closeButton = screen.getByLabelText(/close/i);
    fireEvent.click(closeButton);
    expect(consoleLog).toHaveBeenCalledWith(
      expect.stringMatching(/close button has been clicked/i),
    );
  });
});
