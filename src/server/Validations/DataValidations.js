import {
  param, body, sanitizeBody,
} from 'express-validator';
// Model
import { categories } from '../models/Data';
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
    sanitizeBody('key').customSanitizer(value => String(value)),
    body('key').trim().isLength({ min: 2, max: 78 }),
    body('value').trim().isLength({ min: 2, max: 378 }),
    body('category').isIn(categories),
  ],
  update: [
    param('id').isMongoId(),
    sanitizeBody('key').customSanitizer(value => String(value)),
    body('key').trim().isLength({ min: 2, max: 78 }),
    body('value').trim().isLength({ min: 2, max: 378 }),
    body('category').isIn(categories),
  ],
  showByCategory: [
    param('category').isIn(categories),
  ],
};

export default addValidation(rules);
