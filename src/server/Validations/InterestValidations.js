import {
  param, body,
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
    body('description').trim().isLength({ min: 2, max: 378 })
      .optional({ checkFalsy: true }),
    body('link').trim().isURL()
      .optional({ checkFalsy: true }),
  ],
  update: [
    param('id').isMongoId(),
    body('name').trim().isLength({ min: 2, max: 78 }),
    body('description').trim().isLength({ min: 2, max: 378 })
      .optional({ checkFalsy: true }),
    body('link').trim().isURL()
      .optional({ checkFalsy: true }),
  ],
};

export default addValidation(rules);
