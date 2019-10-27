// middleware
import validate from '../../server/middlewares/validationResult';

/**
 * Adds `validationResult` to a validations object.
 *
 * @category Express validator
 * @param {object} validation rules.
 * @returns {object} Returns the new valitaion object.
 * @example
 *
 * addValidaton({
    show: [
      param('id').isMongoId(),
    ],
    create: [
      body('name').trim().isLength({ min: 2, max: 78 }),
      body('kind').trim().isLength({ min: 2, max: 78 }),
    ]
  });
 * // =>
  {
    show: [
      param('id').isMongoId(),
      validate(),
    ],
    create: [
      body('name').trim().isLength({ min: 2, max: 78 }),
      body('kind').trim().isLength({ min: 2, max: 78 }),
      validate(),
    ]
  }
 */
export default rules => Object.fromEntries(Object.entries(rules).map(
  ([key, value]) => [key, [...value, validate()]]
));
