import { task } from 'folktale/concurrency/task';
// Model
import File from '../models/File';
// Excceptions
import { catchDatabaseExcception, DatabaseExcception, NotFoundException } from '../../shared/Identities/Excception';
// utils
import { isFirstRender } from '../../shared/utils/functional';
import { deleteFile } from '../../shared/utils/TaskFs';


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
  .then(data => (
    isFirstRender(data)
      ? next(NotFoundException(new Error(`Files of kind ${req.params.kind} couldn't be found`)))
      : res.status(200).json({
        message: 'Sucessfull Request',
        data,
      })
  ))
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

export const destroy = () => (req, res, next) => task(
  resolver => File.findByIdAndDelete(
    req.params.id,
    (err, file) => (err ? resolver.reject(err) : resolver.resolve(file))
  )
)
  .chain(file => deleteFile(file.path))
  .run()
  .listen({
    onRejected: err => next(DatabaseExcception(err)),
    onResolved: () => res.status(200).json({
      message: 'File deleted sucessfuly',
      deletedId: req.params.id,
    }),
  });
