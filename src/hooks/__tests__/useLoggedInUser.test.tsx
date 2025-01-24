import React from "react";
import { render, screen } from "@testing-library/react";
import { useLoggedInUser } from "../useLoggedInUser";

// Test component for using a hook
const TestComponent = () => {
  const user = useLoggedInUser();
  return (
    <div>
      {user ? <span>{user.userName}</span> : <span>No user logged in</span>}
    </div>
  );
};

describe("useLoggedInUser", () => {
  const originalConsoleError = console.error;

  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  it("should show the text 'No user logged in' if the data in localStorage is incorrect", () => {
    const consoleErrorMock = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    localStorage.setItem("loggedInUser", "invalid data");

    render(<TestComponent />);

    expect(screen.getByText("No user logged in")).toBeInTheDocument();

    expect(consoleErrorMock).toHaveBeenCalledWith(
      "Invalid JSON in localStorage:",
      expect.any(SyntaxError)
    );
  });

  it("should show username from localStorage", () => {
    const validUserData = JSON.stringify({ userName: "John Doe" });
    localStorage.setItem("loggedInUser", validUserData);

    render(<TestComponent />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("should show the text 'No user logged in' if no user data is in localStorage", () => {
    render(<TestComponent />);

    expect(screen.getByText("No user logged in")).toBeInTheDocument();
  });
});