export const validateRegister = (
  name: string,
  email: string,
  password: string
) => {
  if (!name || !email || !password) {
    throw new Error("Name, email and password are required");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }
};

export const validateLogin = (
  email: string,
  password: string
) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
};