import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PasswordStrength from "../PasswordStrength";

describe("PasswordStrength Component", () => {
  test("renders correctly with a weak password", () => {
    render(<PasswordStrength password="abc" />);
    expect(
      screen.getByText(/password strength: Very weak/i)
    ).toBeInTheDocument();
  });

  test("renders correctly with a strong password", () => {
    render(<PasswordStrength password="Abcdefghi1!" />);
    expect(screen.getByText(/password strength: strong/i)).toBeInTheDocument();
  });

  test("displays correct strength text for various passwords", () => {
    const { rerender } = render(<PasswordStrength password="abc" />);
    expect(
      screen.getByText(/password strength: very weak/i)
    ).toBeInTheDocument();

    rerender(<PasswordStrength password="Abcdefg" />);
    expect(screen.getByText(/password strength: weak/i)).toBeInTheDocument();

    rerender(<PasswordStrength password="Abcdefg1!" />);
    expect(screen.getByText(/password strength: strong/i)).toBeInTheDocument();
  });

  test("renders correct progress bar percentage for password strength", () => {
    const { rerender } = render(<PasswordStrength password="abc" />);

    let progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveAttribute("aria-valuenow", "20");

    rerender(<PasswordStrength password="abc1" />);
    progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveAttribute("aria-valuenow", "40");

    rerender(<PasswordStrength password="abc1A" />);
    progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveAttribute("aria-valuenow", "60");

    // Ререндерим для среднего пароля
    rerender(<PasswordStrength password="Abcdefg1" />);
    progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveAttribute("aria-valuenow", "80");

    // Ререндерим для сильного пароля
    rerender(<PasswordStrength password="Abcdefg1!" />);
    progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveAttribute("aria-valuenow", "100");
  });
});
