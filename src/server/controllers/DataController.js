// import Result from 'folktale/result';
// Models
import Data from '../models/Data';
// Excceptions
import { catchDatabaseExcception, DatabaseExcception } from '../../shared/Identities/Excception';

// response methods
export const index = () => (req, res, next) => Data.find({})
  .then(data => res.status(200).json({
    message: 'Sucessfull Request',
    data,
  }))
  .catch(catchDatabaseExcception(next));

export const show = () => (req, res, next) => Data.findById(req.params.id)
  .then(data => res.status(200).json({
    message: 'Sucessfull Request',
    data,
  }))
  .catch(catchDatabaseExcception(next));

export const create = () => (req, res, next) => Data.create(req.body)
  .then(data => res.status(200).json({
    message: 'Sucessfull Request',
    data,
  }))
  .catch(catchDatabaseExcception(next));

export const showByCategory = () => (req, res, next) => Data.find({ catetegory: req.params.category })
  .then(data => res.status(200).json({
    message: 'Sucessfull Request',
    data,
  }))
  .catch(catchDatabaseExcception(next));

export const update = () => (req, res, next) => Data.findByIdAndUpdate(
  req.params.id,
  req.body,
  (error, data) => (
    error
      ? next(DatabaseExcception(error))
      : res.status(200).json({
        message: 'Data updated sucessfuly',
        data,
      })
  )
);

export const destroy = () => (req, res, next) => Data.findByIdAndDelete(
  req.params.id,
  error => (
    error
      ? next(DatabaseExcception(error))
      : res.status(200).json({
        message: 'Data deleted sucessfuly',
        deletedId: req.params.id,
      })
  )
);
