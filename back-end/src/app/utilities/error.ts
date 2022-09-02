const ErrorConstructor = (status: number, message: string) => ({
  status,
  message,
  isExpected: true,
});

const ERRORS = {
  USER: {
    NOT_FOUND: ErrorConstructor(404, 'User not found'),
    ALREADY_EXISTS: ErrorConstructor(403, 'User already exists'),
  },
  AUTH: {
    TOKEN_NOT_FOUND: ErrorConstructor(400, 'Token not found'),
    INVALID_TOKEN: ErrorConstructor(403, 'Invalid token'),
    INVALID_CREDENTIALS: ErrorConstructor(403, 'Invalid credentials'),
  },
  PROCEDURE: {
    NOT_FOUND: ErrorConstructor(404, 'Procedure not found'),
  },
};

export default ERRORS;