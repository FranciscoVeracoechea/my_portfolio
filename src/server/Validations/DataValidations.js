import {
  param, body, sanitizeBody,
} from 'express-validator';
// Model
import { categories } from '../models/Data';
// middleware
import validate from '../middlewares/validationResult';


// rules
export default {
  show: [
    param('id').isMongoId(),
    validate(),
  ],
  destroy: [
    param('id').isMongoId(),
    validate(),
  ],
  create: [
    sanitizeBody('key').customSanitizer(value => String(value)),
    body('key').trim().isLength({ min: 3, max: 78 }),
    body('value').trim().isLength({ min: 3, max: 378 }),
    body('category').isIn(categories),
    validate(),
  ],
  update: [
    param('id').isMongoId(),
    sanitizeBody('key').customSanitizer(value => String(value)),
    body('key').trim().isLength({ min: 3, max: 78 }),
    body('value').trim().isLength({ min: 3, max: 378 }),
    body('category').isIn(categories),
    validate(),
  ],
  showByCategory: [
    param('category').isIn(categories),
    validate(),
  ],
};
