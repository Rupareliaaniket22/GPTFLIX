export const FormValidation = (email, password) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$#!%*?&]{8,}$/.test(
      password
    );

  if (!emailRegex) {
    return 'Please enter a valid email';
  }
  if (!passwordRegex) {
    return ' Invalid Password! Your password must be at least 8 characters long, include one letter, one number, and one special character (@$!%*?&).';
  }
  return '';
};
