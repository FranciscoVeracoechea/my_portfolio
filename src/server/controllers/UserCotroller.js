// dependencies
import {
  body, oneOf, param, sanitizeBody,
} from 'express-validator';
import jwt from 'jsonwebtoken';
// Models
import User from '../models/User';
// middlewares
import validationResult from '../middlewares/validationResult';
// utils
import Box from '../../shared/utils/Box';
import { switchCase, newError } from '../../shared/utils/functional';


const {
  SECRET, APP_URL, TOKEN_LIFE, APP_TITLE,
} = process.env;
const TOKEN = 'TOKEN';
const COOKIE = 'COOKIE';
const jwtOptions = { expiresIn: TOKEN_LIFE, audience: APP_URL, issuer: APP_TITLE };

const checkUsername = (username, { req }) => User.findOne({ username }).then((user) => {
  if (username === req?.session?.user?.username) return Promise.resolve();
  if (user) return Promise.reject(new Error('Username already in use'));
});

const checkEmail = (email, { req }) => User.findOne({ email }).then((user) => {
  if (email === req?.session?.user?.email) return Promise.resolve();
  if (user) return Promise.reject(new Error('E-mail already in use'));
});

// validations
export const validate = (methodName) => {
  const validations = switchCase({
    show: [
      param('username').not().isEmpty().trim()
        .isLength({ min: 4, max: 28 }),
    ],
    register: [
      body('email').isEmail().custom(checkEmail),
      body('password').isLength({ min: 5, max: 78 }),
      body('username').not().isEmpty().trim()
        .isLength({ min: 4, max: 28 })
        .custom(checkUsername),
      body('grantType').isIn([TOKEN, COOKIE]),
    ],
    login: [
      sanitizeBody('password').customSanitizer(value => String(value)),
      oneOf([
        body('email').isEmail(),
        body('username').not().isEmpty().trim()
          .isLength({ min: 4, max: 28 }),
      ]),
      body('password').isLength({ min: 5, max: 78 }),
      body('grantType').isIn([TOKEN, COOKIE]),
    ],
    update: [
      param('id').isMongoId(),
      body('username').isLength({ min: 4, max: 28 })
        .custom(checkUsername),
      body('email').isEmail().custom(checkEmail),
      body('description').isLength({ min: 4, max: 480 })
        .trim().escape()
        .optional({ checkFalsy: true })
        .withMessage('must have a size between 4 and 480 chars'),
      body('fullname').isLength({ min: 4, max: 48 })
        .trim().escape()
        .optional({ checkFalsy: true })
        .withMessage('must have a size between 4 and 48 chars'),
    ],
  })(false)(methodName);
  return validations ? [...validations, validationResult()] : [];
};
// helper methods
const emailOrUsername = (email, username) => {
  const identity = email ? 'email' : 'username';
  return { [identity]: identity === 'email' ? email : username };
};
const getSafeData = ({ salt, password, ...data }) => data;

// response methods
export const index = () => (req, res, next) => {
  return User.find({}, '-salt -password')
    .then(data => res.status(200).json({
      message: 'Sucessfull Request',
      data,
    }))
    .catch(next);
};

export const show = () => (req, res, next) => User.findOne(
  { username: req.params.username },
  '-salt -password'
)
  .then(data => res.status(200).json({
    message: 'Sucessfull Request',
    data,
  }))
  .catch(next);

// response methods
export const userInfo = () => (req, res) => {
  return res.status(200)
    .json({
      message: 'Sucessfull Request',
      data: { user: getSafeData(req?.user?._doc || req.session.user) },
    });
};

export const register = () => (req, res, next) => {
  const {
    email, username, password, grantType,
  } = req.body;
  User.create({
    email,
    username,
    password,
  }).then(({ _doc: data }) => {
    if (grantType === TOKEN) {
      jwt.sign(
        { username: data.username, _id: data._id, email: data.email },
        SECRET,
        jwtOptions,
        (error, token) => {
          if (error) next(newError('Error signing token')({ status: 500, error }));
          res.status(200).json({
            message: 'User created in successfully!',
            data: { user: getSafeData(data) },
            token: `Bearer ${token}`,
          });
        }
      );
    } else if (grantType === COOKIE) {
      req.session.isAuthenticated = true;
      req.session.user = {
        _id: data._id,
        username: data.username,
        email: data.email,
      };
      res.status(200).json({
        message: 'User created in successfully!',
        data: { user: getSafeData(data) },
      });
    }
  })
    .catch(next);
};

export const login = () => (req, res, next) => {
  const {
    email, password, username, grantType,
  } = req.body;
  User.findOne(emailOrUsername(email, username))
    .then((user) => {
      if (!user) return next(newError('Account Not Found')({ status: 404 }));
      if (user.checkPassword(password)) {
        const { _doc: data } = user;
        if (grantType === TOKEN) {
          jwt.sign(
            { username: data.username, _id: data._id, email: data.email },
            SECRET,
            jwtOptions,
            (error, token) => {
              if (error) next(newError('Error signing token')({ status: 500, error }));
              res.status(200).json({
                message: 'User created in successfully!',
                data: { user: getSafeData(data) },
                token: `Bearer ${token}`,
              });
            }
          );
        } else if (grantType === COOKIE) {
          req.session.isAuthenticated = true;
          req.session.user = {
            _id: data._id,
            username: data.username,
            email: data.email,
          };
          res.status(200).json({
            message: 'User created in successfully!',
            data: { user: getSafeData(data) },
          });
        }
      } else {
        next(newError('Invalid Credentials')({ status: 401 }));
      }
    })
    .catch(next);
};

export const logout = () => (req, res) => {
  req.session = null;
  res.status(200).json({
    message: 'User logged out!',
  });
};

export const update = () => (req, res, next) => {
  Box([req.params.id, req.body, { new: true }])
    .map(([id, data, options]) => [
      id,
      {
        username: data.username,
        email: data.email,
        description: data.description,
        fullname: data.fullname,
      },
      options,
    ])
    .chain(params => User.findByIdAndUpdate(...params, (err, data) => {
      if (err) return next(err);
      res.status(200).json({
        message: 'Sucessfull Request',
        data,
      });
    }));
};
