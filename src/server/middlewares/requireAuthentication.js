import passport from 'passport';
import Result from 'folktale/result';
import { newError } from '../../shared/utils/functional';


const { SECRET } = process.env;
const isSelfRequest = request => /node.js/i.test(request.get('user-agent'));
const validateSelfRequest = request => (
  (isSelfRequest(request) && request.get('Authorization') === SECRET)
    ? Result.Error(null)
    : Result.Ok(request)
);
const validateSession = request => (
  (request.session && request.session.isAuthenticated && request.session.user)
    ? Result.Error(null)
    : Result.Ok(request)
);
const validateAuth = request => (
  request.get('Authorization')
    ? Result.Ok(passport.authenticate('jwt', { session: false }))
    : Result.Error(newError(new Error('Unauthenticated')))
);


export default () => (request, response, next) => validateSelfRequest(request)
  .chain(validateSession)
  .chain(validateAuth)
  .fold(
    err => (err ? next(err({ status: 401 })) : next()),
    passportMiddleware => passportMiddleware(request, response, next)
  );
