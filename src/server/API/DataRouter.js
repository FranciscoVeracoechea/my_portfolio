import { Router } from 'express';
import requireAuthentication from '../middlewares/requireAuthentication';
import * as DataController from '../controllers/DataController';
import DataValidations from '../validations/DataValidations';


export default (app, path) => {
  // Protected Routes
  const protectedRouter = Router();
  protectedRouter.use(requireAuthentication());
  protectedRouter.post('/', DataValidations.create, DataController.create());
  protectedRouter.put('/:id', DataValidations.update, DataController.update());
  protectedRouter.delete('/:id', DataValidations.destroy, DataController.destroy());

  // Unprotected Routes
  const openRouter = Router();
  openRouter.get('/', DataController.index());
  openRouter.get('/:id', DataValidations.show, DataController.show());
  openRouter.get('/category/:category', DataValidations.showByCategory, DataController.showByCategory());

  app.use(path, openRouter);
  app.use(path, protectedRouter);
};
