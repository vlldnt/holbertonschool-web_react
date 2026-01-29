import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer component", () => {
  it("renders without crashing", () => {
    render(<Footer />);
  });
});
