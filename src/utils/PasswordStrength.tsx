import React, { useEffect, useState } from "react";
import { Box, LinearProgress, Typography } from "@mui/material";

interface PasswordStrengthProps {
  password: string;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  const [strength, setStrength] = useState(0);
  const [strengthText, setStrengthText] = useState("Very weak");

  const checkPasswordCriteria = (password: string) => {
    let criteria = 0;

    if (password.length >= 8) criteria += 1;
    if (/[A-Z]/.test(password)) criteria += 1;
    if (/[a-z]/.test(password)) criteria += 1;
    if (/\d/.test(password)) criteria += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) criteria += 1;

    return criteria;
  };

  useEffect(() => {
    const strengthValue = checkPasswordCriteria(password);
    setStrength(strengthValue);

    switch (strengthValue) {
      case 0:
      case 1:
        setStrengthText("Very weak");
        break;
      case 2:
        setStrengthText("Weak");
        break;
      case 3:
        setStrengthText("Average");
        break;
      case 4:
        setStrengthText("Good");
        break;
      case 5:
        setStrengthText("Strong");
        break;
      default:
        setStrengthText("Very weak");
    }
  }, [password]);
    
  const getColor = (strength: number) => {
    switch (strength) {
      case 1:
        return "red"; // Very weak
      case 2:
        return "orange"; // Weak
      case 3:
        return "yellow"; // Average
      case 4:
        return "lawngreen"; // Good
      case 5:
        return "green"; // Strong
      default:
        return "red"; // Very weak
    }
  };

  const strengthPercent = (strength / 5) * 100;

  return (
    <Box sx={{ mt: 2 }}>
      <LinearProgress
        variant="determinate"
        value={strengthPercent}
        sx={{
          "& .MuiLinearProgress-bar": {
            backgroundColor: getColor(strength),
          },
        }}
      />
      <Typography sx={{ mt: 1 }} variant="body2" color="text.secondary">
        Password strength: {strengthText}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        The password must contain a minimum of 8 characters, at least one
        uppercase letter, lowercase letter, number and special character.
      </Typography>
    </Box>
  );
};

export default PasswordStrength;
