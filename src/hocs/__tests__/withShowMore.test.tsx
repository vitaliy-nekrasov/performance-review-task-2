import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import withShowMore, { WithShowMoreProps } from "../withShowMore";

// Creating a simple test component for wrapping
const TestComponent: React.FC<WithShowMoreProps> = ({ showAll }) => (
  <div>{showAll ? "All content" : "Short content"}</div>
);

// Wrapping TestComponent with HOC
const WrappedComponent = withShowMore(TestComponent);

describe("withShowMore HOC", () => {
  it("renders the wrapped component with initial content", () => {
    render(<WrappedComponent showAll={false} toggleShowMore={() => {}} />);
    expect(screen.getByText("Short content")).toBeInTheDocument();
  });

  it("toggles showAll state to true on button click and displays 'Show Less'", () => {
    render(<WrappedComponent showAll={false} toggleShowMore={() => {}} />);

    const button = screen.getByRole("button", { name: /show more/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.getByText("All content")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /show less/i })
    ).toBeInTheDocument();
  });
});
