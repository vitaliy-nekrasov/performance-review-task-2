export const checkPasswordCriteria = (password: string): number => {
  let criteria = 0;

  if (password.length >= 8) criteria += 1;
  if (/[A-Z]/.test(password)) criteria += 1;
  if (/[a-z]/.test(password)) criteria += 1;
  if (/\d/.test(password)) criteria += 1;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) criteria += 1;

  return criteria;
};
