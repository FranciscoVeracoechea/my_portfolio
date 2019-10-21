import {
  param, body,
} from 'express-validator';
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
    body('name').trim().isLength({ min: 2, max: 78 }),
    body('kind').trim().isLength({ min: 2, max: 78 }),
    validate(),
  ],
  showByKind: [
    param('kind').not().isEmpty(),
  ],
};
