// dependencies
import passport from 'passport';
import { union } from 'folktale/adt/union';
// Helpers
import { AuthenticationException } from '../../shared/Identities/Excception';
import Sequence from '../../shared/Identities/Sequence';


const { SECRET } = process.env;

const { Success, PassportJWT, Unauthenticated } = union('AuthValidation', {
  Success() { return {}; },
  Unauthenticated() { return { message: 'Unauthenticated' }; },
  PassportJWT(passportMiddleware) {
    return { passportMiddleware };
  },
});

// * Validations ---------------------------------
// validateSelfRequest = ExpressRequest -> Boolean
const isSelfRequest = request => /node.js/i.test(request.get('user-agent'));
// validateSelfRequest :: request -> Sequence
const validateSelfRequest = request => (
  (isSelfRequest(request) && request.get('Authorization') === SECRET)
    ? Sequence.Done(Success())
    : Sequence.Next(request)
);
// validateSession = ExpressRequest -> Sequence
const validateSession = request => (
  (request.session && request.session.isAuthenticated && request.session.user)
    ? Sequence.Done(Success())
    : Sequence.Next(request)
);
// validateAuth = ExpressRequest -> Sequence
const validateAuth = request => (
  request.get('Authorization')
    ? Sequence.Done(PassportJWT(passport.authenticate('jwt', { session: false })))
    : Sequence.Done(Unauthenticated())
);

// * Middleware ------------------------------
// (ExpressRequest, ExpressResponse, ExpressNext) -> void
export default () => (request, response, next) => validateSelfRequest(request)
  .chain(validateSession)
  .chain(validateAuth)
  .finally(
    result => result.matchWith({
      Success: () => next(),
      PassportJWT: ({ passportMiddleware }) => passportMiddleware(request, response, next),
      Unauthenticated: ({ message }) => next(AuthenticationException(new Error(message), message)),
    })
  );
