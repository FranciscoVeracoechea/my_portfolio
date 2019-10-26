// import Result from 'folktale/result';
// Models
import Technology from '../models/Technology';

// response methods
export const index = () => (req, res, next) => Technology.find({})
  .then(data => res.status(200).json({
    message: 'Sucessfull Request',
    data,
  }))
  .catch(next);

export const show = () => (req, res, next) => Technology.findById(req.params.id)
  .then(data => res.status(200).json({
    message: 'Sucessfull Request',
    data,
  }))
  .catch(next);

export const create = () => (req, res, next) => Technology.create(req.body)
  .then(data => res.status(200).json({
    message: 'Sucessfull Request',
    data,
  }))
  .catch(next);

export const addTechnology = () => (req, res, next) => Technology.findById(req.params.id)
  .then((category) => {
    category.technologies.push(req.body);
    res.status(200).json({
      message: 'Sucessfull Request, technology added',
      data: category.technologies[category.technologies.length - 1],
    });
  })
  .catch(next);

export const deleteTechnology = () => (req, res, next) => Technology.findById(req.params.categoryId)
  .then((category) => {
    category.technologies.id(req.params.technologyId).remove();
    res.status(200).json({
      message: 'Sucessfull Request, technology removed',
    });
  })
  .catch(next);

export const update = () => (req, res, next) => Technology.findByIdAndUpdate(
  req.params.id,
  req.body,
  (error, data) => (
    error
      ? next(error)
      : res.status(200).json({
        message: 'Data updated sucessfuly',
        data,
      })
  )
);

export const destroy = () => (req, res, next) => Technology.findByIdAndDelete(
  req.params.id,
  error => (
    error
      ? next(error)
      : res.status(200).json({
        message: 'Data deleted sucessfuly',
        deletedId: req.params.id,
      })
  )
);
