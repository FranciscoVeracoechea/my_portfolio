import {
  param, body, sanitizeBody,
} from 'express-validator';
// utils
import addValidation from '../../shared/utils/addValidation';


// validations
const rules = {
  show: [
    param('id').isMongoId(),
  ],
  destroy: [
    param('id').isMongoId(),
  ],
  create: [
    body('order').isNumeric(),
    body('name').trim().isLength({ min: 2, max: 78 }),
    sanitizeBody('order').toInt(),
  ],
  update: [
    param('id').isMongoId(),
    body('name').trim().isLength({ min: 2, max: 78 }),
    body('order').isNumeric(),
    sanitizeBody('order').toInt(),
  ],
  addTechnology: [
    param('id').isMongoId(),
    body('name').trim().isLength({ min: 2, max: 78 }),
    body('description').optional({ checkFalsy: true }).isLength({ min: 6, max: 230 }),
    body('level').isInt({ min: 1, max: 5 }),
    body('link').optional({ checkFalsy: true }),
  ],
  deleteTechnology: [
    param('categoryId').isMongoId(),
    param('technologyId').isMongoId(),
  ],
  updateTechnology: [
    param('categoryId').isMongoId(),
    param('technologyId').isMongoId(),
    body('name').trim().isLength({ min: 2, max: 78 }),
    body('description').optional({ checkFalsy: true }).isLength({ min: 6, max: 230 }),
    body('level').isInt({ min: 1, max: 5 }),
    body('link').optional({ checkFalsy: true }),
  ],
};

export default addValidation(rules);
