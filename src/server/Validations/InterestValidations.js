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
    body('description').trim().isLength({ min: 2, max: 378 })
      .optional({ checkFalsy: true }),
    body('link').trim().isURL()
      .optional({ checkFalsy: true }),
    validate(),
  ],
  update: [
    param('id').isMongoId(),
    body('name').trim().isLength({ min: 2, max: 78 }),
    body('description').trim().isLength({ min: 2, max: 378 })
      .optional({ checkFalsy: true }),
    body('link').trim().isURL()
      .optional({ checkFalsy: true }),
    validate(),
  ],
};
