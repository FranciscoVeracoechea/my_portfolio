import passport from 'passport';
import Result from 'folktale/result';


const { SECRET } = process.env;
const getError = () => {
  const e = new Error('Unauthenticated');
  e.status = 401;
  return e;
};

// * Validations ---------------------------------
// validateSelfRequest :: ExpressRequest -> Boolean
const isSelfRequest = request => /node.js/i.test(request.get('user-agent'));
// validateSelfRequest :: request -> Result
const validateSelfRequest = request => (
  (isSelfRequest(request) && request.get('Authorization') === SECRET)
    ? Result.Error(null)
    : Result.Ok(request)
);
// validateSession :: ExpressRequest -> Result
const validateSession = request => (
  (request.session && request.session.isAuthenticated && request.session.user)
    ? Result.Error(null)
    : Result.Ok(request)
);
// validateAuth :: ExpressRequest -> Result
const validateAuth = request => (
  request.get('Authorization')
    ? Result.Ok(passport.authenticate('jwt', { session: false }))
    : Result.Error(getError())
);

// * Middleware ------------------------------
// (ExpressRequest, ExpressResponse, ExpressNext) -> void
export default () => (request, response, next) => validateSelfRequest(request)
  .chain(validateSession)
  .chain(validateAuth)
  .fold(
    error => (error ? next(error) : next()),
    passportMiddleware => passportMiddleware(request, response, next)
  );
