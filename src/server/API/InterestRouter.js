import { Router } from 'express';
import requireAuthentication from '../middlewares/requireAuthentication';
import * as InterestController from '../controllers/InterestController';
import InterestValidations from '../validations/InterestValidations';


export default (app, path) => {
  // Protected Routes
  const protectedRouter = Router();
  protectedRouter.use(requireAuthentication());
  protectedRouter.post('/', InterestValidations.create, InterestController.create());
  protectedRouter.put('/:id', InterestValidations.update, InterestController.update());
  protectedRouter.delete('/:id', InterestValidations.destroy, InterestController.destroy());

  // Unprotected Routes
  const openRouter = Router();
  openRouter.get('/', InterestController.index());
  openRouter.get('/:id', InterestValidations.show, InterestController.show());

  app.use(path, openRouter);
  app.use(path, protectedRouter);
};
