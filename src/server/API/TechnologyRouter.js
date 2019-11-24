import { Router } from 'express';
import requireAuthentication from '../middlewares/requireAuthentication';
import * as TechnologiesController from '../controllers/TechnologiesController';
import TechnologyValidations from '../Validations/TechnologyValidations';


export default () => {
  // Protected Routes
  const protectedRouter = Router();
  protectedRouter.use(requireAuthentication());
  protectedRouter.post('/', TechnologyValidations.create, TechnologiesController.create());
  protectedRouter.delete('/:id', TechnologiesController.destroy());
  protectedRouter.put(
    '/:id',
    TechnologyValidations.update,
    TechnologiesController.update()
  );
  protectedRouter.post(
    '/:id',
    TechnologyValidations.addTechnology,
    TechnologiesController.addTechnology()
  );
  protectedRouter.delete(
    '/category/:categoryId/tech/:technologyId',
    TechnologyValidations.deleteTechnology,
    TechnologiesController.deleteTechnology()
  );
  protectedRouter.put(
    '/category/:categoryId/tech/:technologyId',
    TechnologyValidations.updateTechnology,
    TechnologiesController.updateTechnology()
  );

  // Unprotected Routes
  const openRouter = Router();
  openRouter.get('/', TechnologiesController.index());
  openRouter.get('/:id', TechnologyValidations.show, TechnologiesController.show());

  return [protectedRouter, openRouter];
};
