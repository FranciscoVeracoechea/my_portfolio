import { Router } from 'express';
import Maybe from 'folktale/maybe';
import requireAuthentication from '../middlewares/requireAuthentication';
import * as UserController from '../controllers/UserCotroller';


const clearSession = req => (
  req?.session?.user && req?.session?.isAuthenticated
    ? Maybe.Just((r) => { r.session = null; })
    : Maybe.Nothing()
);

const deletePreviuosSession = () => (req, res, next) => clearSession(req)
  .matchWith({
    Just: ({ value }) => {
      value(req);
      next();
    },
    Nothing: () => next(),
  });


export default () => {
  // Protected Routes
  const protectedRouter = Router();
  protectedRouter.use(requireAuthentication());

  protectedRouter.get('/', UserController.index());
  protectedRouter.get('/userInfo', UserController.userInfo());
  protectedRouter.get('/show/:username', UserController.validate('show'), UserController.show());
  protectedRouter.post('/logout', UserController.logout());
  protectedRouter.put('/:id', UserController.validate('update'), UserController.update());

  // Unprotected Routes
  const openRouter = Router();
  openRouter.post(
    '/register',
    [deletePreviuosSession(), ...UserController.validate('register')],
    UserController.register()
  );
  openRouter.post(
    '/login',
    [deletePreviuosSession(), ...UserController.validate('login')],
    UserController.login()
  );

  return [openRouter, protectedRouter];
};
