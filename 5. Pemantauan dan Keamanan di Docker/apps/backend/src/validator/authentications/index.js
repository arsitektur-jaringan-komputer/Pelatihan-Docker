const InvariantError = require('../../exceptions/InvariantError');
const {
  PostAuthenticationPayloadSchema,
  PutAuthenticationPayloadSchema,
  DeleteAuthenticationPayloadSchema,
} = require('./schema');

const AuthenticationsValidator = {
  validatePostAuthenticationPayload: (payload) => {
    const validatonResult = PostAuthenticationPayloadSchema.validate(payload);

    if (validatonResult.error) {
      throw new InvariantError(validatonResult.error.message);
    }
  },
  validatePutAuthenticationPayload: (payload) => {
    const validatonResult = PutAuthenticationPayloadSchema.validate(payload);

    if (validatonResult.error) {
      throw new InvariantError(validatonResult.error.message);
    }
  },
  validateDeleteAuthenticationPayload: (payload) => {
    const validatonResult = DeleteAuthenticationPayloadSchema.validate(payload);

    if (validatonResult.error) {
      throw new InvariantError(validatonResult.error.message);
    }
  },
};

module.exports = AuthenticationsValidator;
