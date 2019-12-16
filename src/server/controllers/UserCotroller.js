// dependencies
import jwt from 'jsonwebtoken';
// Models
import User from '../models/User';
// Excceptions
import {
  catchDatabaseExcception,
  DatabaseExcception,
  InternalServerErrorException,
  NotFoundException,
  AuthenticationException,
} from '../../shared/Identities/Excception';


const {
  SECRET, APP_URL, TOKEN_LIFE, APP_TITLE,
} = process.env;
const TOKEN = 'TOKEN';
const COOKIE = 'COOKIE';
const JWT_OPTIONS = { expiresIn: TOKEN_LIFE, audience: APP_URL, issuer: APP_TITLE };
const TOKEN_ERROR_MSG = 'Error signing token';

// helper methods
const getSafeData = ({ salt: _s, password: _p, ...data }) => data;

const signToken = (data, res, next, successMsg) => jwt.sign(
  { username: data.username, _id: data._id, email: data.email },
  SECRET,
  JWT_OPTIONS,
  (error, token) => (
    error
      ? next(InternalServerErrorException(new Error(TOKEN_ERROR_MSG)))
      : res.status(200).json({
        message: successMsg,
        data: { user: getSafeData(data) },
        token: `Bearer ${token}`,
      })
  )
);


// response methods
export const index = () => (req, res, next) => User.find({}, '-salt -password')
  .then(data => res.status(200).json({
    message: 'Sucessfull Request',
    data,
  }))
  .catch(catchDatabaseExcception(next));

export const show = () => (req, res, next) => User.findOne(
  { username: req.params.username },
  '-salt -password'
)
  .then(data => res.status(200).json({
    message: 'Sucessfull Request',
    data,
  }))
  .catch(catchDatabaseExcception(next));

// response methods
export const userInfo = () => (req, res) => res.status(200)
  .json({
    message: 'Sucessfull Request',
    data: { user: getSafeData(req?.user?._doc || req.session.user) },
  });

export const register = () => (req, res, next) => {
  const {
    email, username, password, grantType, fullname,
  } = req.body;
  User.create({
    email,
    username,
    password,
    fullname,
  }).then(({ _doc: data }) => {
    if (grantType === TOKEN) {
      signToken(data, res, next, 'User registered successfully!');
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
    .catch(catchDatabaseExcception(next));
};

export const login = () => (req, res, next) => {
  const {
    email, password, grantType,
  } = req.body;
  const notFound = 'Account Not Found';
  const invalid = 'Invalid Credentials';
  User.findOne({ email })
    .then((user) => {
      if (!user) return next(NotFoundException(new Error(notFound), notFound));
      if (user.checkPassword(password)) {
        const { _doc: data } = user;
        if (grantType === TOKEN) {
          signToken(data, res, next, 'User logged in successfully!');
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
        next(AuthenticationException(new Error(invalid), invalid));
      }
    })
    .catch(catchDatabaseExcception(next));
};

export const logout = () => (req, res) => {
  req.session = null;
  res.status(200).json({
    message: 'User logged out!',
  });
};

export const update = () => (req, res, next) => User.findByIdAndUpdate(
  req.params.id,
  {
    username: req.body.username,
    email: req.body.email,
    description: req.body.description,
    fullname: req.body.fullname,
  },
  { new: true },
  (err, data) => (
    err
      ? next(DatabaseExcception(err))
      : res.status(200).json({
        message: 'Sucessfull Request',
        data,
      })
  )
);
