import { validationResult } from 'express-validator';
import { ValidationException } from '../../shared/Identities/Excception';


export default () => (req, res, next) => {
  const result = validationResult(req);
  return !result.isEmpty()
    ? next(ValidationException(result.errors))
    : next();
};
