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
    body('kind').trim().isLength({ min: 2, max: 78 }),
  ],
  showByKind: [
    param('kind').not().isEmpty(),
  ],
};


export default addValidation(rules);
