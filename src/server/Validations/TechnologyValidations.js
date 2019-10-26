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
    body('name').trim().isLength({ min: 2, max: 78 }),
    body('order').isNumeric(),
    sanitizeBody('order').toInt(),
  ],
  update: [
    param('id').isMongoId(),
    body('name').trim().isLength({ min: 2, max: 78 }),
    body('order').isNumeric(),
    sanitizeBody('order').toInt(),
  ],
};

export default addValidation(rules);
