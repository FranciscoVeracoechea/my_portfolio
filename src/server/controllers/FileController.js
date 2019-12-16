import fs from 'fs';
// Model
import File from '../models/File';
// Excceptions
import { catchDatabaseExcception, DatabaseExcception } from '../../shared/Identities/Excception';


const url = '/static/uploads/';


export const index = () => (req, res, next) => File.find({})
  .then(data => res.status(200).json({
    message: 'Sucessfull Request',
    data,
  }))
  .catch(catchDatabaseExcception(next));

export const show = () => (req, res, next) => File.findById(req.params.id)
  .then(data => res.status(200).json({
    message: 'Sucessfull Request',
    data,
  }))
  .catch(catchDatabaseExcception(next));

export const showByKind = () => (req, res, next) => File.find({ kind: req.params.kind })
  .then(data => res.status(200).json({
    message: 'Sucessfull Request',
    data,
  }))
  .catch(catchDatabaseExcception(next));


export const create = () => (req, res, next) => File.create({
  name: req.body.name,
  kind: req.body.kind,
  url: url + req.file.filename,
  path: req.file.path,
})
  .then(data => res.status(200).json({
    message: 'File uploaded successfully',
    data,
  }))
  .catch(catchDatabaseExcception(next));

export const destroy = () => (req, res, next) => File.findByIdAndDelete(
  req.params.id,
  (error, file) => (
    error
      ? next(DatabaseExcception(error))
      : fs.unlink(file.path, err => (
        err
          ? next(DatabaseExcception(err))
          : res.status(200).json({
            message: 'File deleted sucessfuly',
            deletedId: req.params.id,
          })
      ))
  )
);
