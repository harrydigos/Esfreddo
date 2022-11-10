// From: https://emailregex.com/
export const emailRegex = new RegExp(
  "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
);

// At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
export const passwordVeryStrongRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);

// At least 8 characters, 1 lowercase, 1 uppercase, 1 number
export const passwordStrongRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"
);

// At least 8 characters, 1 number, 1 lowercase or 8 characters, 1 number, 1 uppercase
export const passwordMediumRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[0-9])(?=.{8,})|^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"
);
