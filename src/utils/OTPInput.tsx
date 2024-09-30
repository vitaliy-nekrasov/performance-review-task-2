import React, { useState, useRef } from "react";
import { Box } from "@mui/material";
import { Notify } from "notiflix";

interface OTPInputProps {
  numInputs: number;
  value: string;
  onChange: (otp: string) => void;
  onSubmit: () => void;
}

const OTPInput: React.FC<OTPInputProps> = ({
  numInputs,
  value,
  onChange,
  onSubmit,
}) => {
  const [otpValues, setOtpValues] = useState<string[]>(
    Array(numInputs).fill("")
  );
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  // Update OTP value and focus on next input
  const handleChange = (val: string, idx: number) => {
    if (!/^\d$/.test(val) && val !== "") {
      Notify.failure("You can only enter digits"); // Numbers check
      return;
    }

    const newOtpValues = [...otpValues];
    newOtpValues[idx] = val;
    setOtpValues(newOtpValues);

    const otpString = newOtpValues.join("");
    onChange(otpString);

    // Move focus to the next input
    if (val && idx < numInputs - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  // Handling backspace to move backwards
  const handleBackspace = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === "Backspace" && !otpValues[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  // Pasting values ​​from the clipboard
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData
      .getData("text")
      .slice(0, numInputs)
      .split("");

    const newOtpValues = [...otpValues];
    pasteData.forEach((char, idx) => {
      if (/^\d$/.test(char)) {
        newOtpValues[idx] = char;
      }
    });
    setOtpValues(newOtpValues);
    onChange(newOtpValues.join(""));
  };

  // Handling the Enter key
  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    handleBackspace(e, idx);

    if (e.key === "Enter") {
      const otpString = otpValues.join("");
      if (otpString.length === numInputs) {
        onSubmit(); // Calling a submission when the fields are filled in
      } else {
        Notify.failure("Please complete the OTP fields");
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: "8px",
        marginTop: "16px",
      }}
      onPaste={handlePaste}
    >
      {otpValues.map((value, idx) => (
        <input
          key={idx}
          ref={(el) => (inputsRef.current[idx] = el)}
          type="text"
          value={value}
          onChange={(e) => handleChange(e.target.value, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          maxLength={1}
          style={{
            width: "40px",
            height: "50px",
            fontSize: "22px",
            textAlign: "center",
            fontWeight: "500",
            borderRadius: "6px",
            border: "1px solid #ccc",
            outline: "none",
          }}
        />
      ))}
    </Box>
  );
};

export default OTPInput;