import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
// import { fireEvent } from "@testing-library/react";
import SignIn from "../SignIn";
import { Notify } from "notiflix";

jest.mock("notiflix", () => ({
  Notify: {
    failure: jest.fn(),
    success: jest.fn(),
  },
}));

describe("SignIn Component", () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it("shows an error for invalid email format", async () => {
    const user = userEvent.setup();
    renderWithRouter(<SignIn />);

    const emailInput = screen.getByLabelText(/Email Address/i);
    const submitButton = screen.getByRole("button", { name: /Sign In/i });

    await user.type(emailInput, "invalid-email");
    await user.click(submitButton);
    // fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    // fireEvent.click(submitButton);

    expect(screen.getByText(/Invalid email format/i)).toBeInTheDocument();
  });

  it("notifies failure for incorrect email or password", async () => {
    const user = userEvent.setup();
    renderWithRouter(<SignIn />);

    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole("button", { name: /Sign In/i });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "wrongpassword");
    await user.click(submitButton);
    // fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    // fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
    // fireEvent.click(submitButton);

    expect(Notify.failure).toHaveBeenCalledWith(
      "Incorrect email or password =("
    );
  });

  it("generates and displays OTP after successful login", async () => {
    const user = userEvent.setup();
    const mockUsers = [{ email: "test@example.com", password: "password123" }];
    localStorage.setItem("users", JSON.stringify(mockUsers));

    renderWithRouter(<SignIn />);

    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole("button", { name: /Sign In/i });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    await user.click(submitButton);
    // fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    // fireEvent.change(passwordInput, { target: { value: "password123" } });
    // fireEvent.click(submitButton);

    expect(screen.getByText(/Enter one-time password/i)).toBeInTheDocument();
  });

  it("stores the user in state after correct OTP", async () => {
    const mockUsers = [{ email: "test@example.com", password: "password123" }];
    localStorage.setItem("users", JSON.stringify(mockUsers));

    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole("button", { name: /Sign In/i });

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");
    await userEvent.click(submitButton);
    // fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    // fireEvent.change(passwordInput, { target: { value: "password123" } });
    // fireEvent.click(submitButton);

    await waitFor(() => {
      const loggedInUserElement = screen.getByTestId("logged-in-user");
      expect(loggedInUserElement).toBeInTheDocument();
    });
  });
});
