// import "@testing-library/jest-dom";
import Home from "@/app/(frontend)/page";
import { render, screen } from "@testing-library/react";

describe("Home", () => {
  // Title of the test
  it("renders a heading", () => {
    // Render the component
    render(<Home />);
    // Assert that the heading is in the document
    expect(screen.getByText("Hello World")).toBeDefined();
  });
});
