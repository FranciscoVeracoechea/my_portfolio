import { Router } from 'express';
import requireAuthentication from '../middlewares/requireAuthentication';
import * as FileController from '../controllers/FileController';
import FileValidations from '../validations/FileValidations';


export default () => {
  // Protected Routes
  const protectedRouter = Router();
  protectedRouter.use(requireAuthentication());
  protectedRouter.post('/', FileValidations.create, FileController.create());
  protectedRouter.delete('/:id', FileController.destroy());

  // Unprotected Routes
  const openRouter = Router();
  openRouter.get('/', FileController.index());
  openRouter.get('/:id', FileValidations.show, FileController.show());
  openRouter.get('/kind/:kind', FileValidations.showByKind, FileController.showByKind());

  return [protectedRouter, openRouter];
};
