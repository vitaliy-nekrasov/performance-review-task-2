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
  beforeEach(() => {
    localStorage.clear();
  });

  it("should show the text 'No user logged in' if the data in localStorage is incorrect", () => {
    localStorage.setItem("loggedInUser", "invalid data");
      
    render(<TestComponent />);
    expect(screen.getByText("No user logged in")).toBeInTheDocument();
  });

  it("should show username from localStorage", () => {
    const validUserData = JSON.stringify({ userName: "John Doe" });
    localStorage.setItem("loggedInUser", validUserData);

    render(<TestComponent />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });
});
