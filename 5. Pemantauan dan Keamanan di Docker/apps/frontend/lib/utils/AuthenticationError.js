class AuthenticationError extends Error {
  constructor(message = 'Token expire') {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export default AuthenticationError;
