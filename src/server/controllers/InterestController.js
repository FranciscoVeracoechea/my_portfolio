// Model
import Interest from '../models/Interest';
// Excceptions
import { catchDatabaseExcception, DatabaseExcception } from '../../shared/Identities/Excception';


export const index = () => (req, res, next) => Interest.find({})
  .then(data => res.status(200).json({
    message: 'Sucessfull Request',
    data,
  }))
  .catch(catchDatabaseExcception(next));

export const show = () => (req, res, next) => Interest.findById(req.params.id)
  .then(data => res.status(200).json({
    message: 'Sucessfull Request',
    data,
  }))
  .catch(catchDatabaseExcception(next));


export const create = () => (req, res, next) => Interest.create(req.body)
  .then(data => res.status(200).json({
    message: 'Sucessfull Request',
    data,
  }))
  .catch(catchDatabaseExcception(next));

export const update = () => (req, res, next) => Interest.findByIdAndUpdate(
  req.params.id,
  req.body,
  (error, data) => (
    error
      ? next(DatabaseExcception(error))
      : res.status(200).json({
        message: 'Interest updated sucessfuly',
        data,
      })
  )
);

export const destroy = () => (req, res, next) => Interest.findByIdAndDelete(
  req.params.id,
  error => (
    error
      ? next(DatabaseExcception(error))
      : res.status(200).json({
        message: 'Interest deleted sucessfuly',
        deletedId: req.params.id,
      })
  )
);
