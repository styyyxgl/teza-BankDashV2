export type AuthValidationData = {
  email?: string;
  password?: string;
  name?: string;
};

export type AuthValidationErrors = Partial<
  Record<keyof AuthValidationData, string>
>;

export const authValidationRules = (data: AuthValidationData) => {
  const errors: AuthValidationErrors = {};
  let isValid = true;

  if (data.email !== undefined) {
    if (!data.email.trim()) {
      errors.email = "email is required";
      isValid = false;
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(data.email)) {
        errors.email = "please enter a valid format (name@example.com)";
        isValid = false;
      }
    }
  }

  if (data.password !== undefined) {
    if (!data.password) {
      errors.password = "password is required";
      isValid = false;
    } else if (data.password.length < 6) {
      errors.password = "password must be at least 6 characters long";
      isValid = false;
    } else if (data.password.length > 30) {
      errors.password = "password must be less than 30 characters";
      isValid = false;
    }
  }

  if (data.name !== undefined) {
    if (!data.name.trim()) {
      errors.name = "name is required";
      isValid = false;
    } else if (data.name.length > 20) {
      errors.name = "name must be less than 20 characters";
      isValid = false;
    }
  }

  return { isValid, errors };
};
