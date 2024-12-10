export const checkValidation = (name, email, password) => {
  if (name !== null) {
    const isNameValid = /^[a-zA-Zà-žÀ-Ž]+(?:[-' ][a-zA-Zà-žÀ-Ž]+)*$/.test(name);
    return isNameValid ? null : "Name is not valid";
  }

  if (email !== null) {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    return isEmailValid ? null : "Email is not valid";
  }

  if (password !== null) {
    const isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(
      password
    );
    return isPasswordValid
      ? null
      : "(Password must be at least 8 characters long and contain both letters and numbers)";
  }

  return null;
};
