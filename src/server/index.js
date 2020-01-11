// dependencies
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';
import cookieSession from 'cookie-session';
import moment from 'moment';
// configs
import dbConnection from './configs/dbConnection';
import passportConfig from './configs/passport';
import appVars from './configs/appVars';
// middlewares
import deviceDetection from './middlewares/deviceDetection';
import helmet from './middlewares/helpmet';
import fileStorage from './middlewares/fileStorage';
import errorHandler from './middlewares/errorHandler';
// util
import { populateProcessEnv } from '../shared/utils/readKeys';
// API router
import ApiRouter from './API';

// Environment Constants
dotenv.config();
populateProcessEnv();
const isAnalyzer = process.env.ANALYZER === 'true';
const isDev = process.env.NODE_ENV === 'development';
// MongoDB connection
dbConnection();
// JWT auth config
const passport = passportConfig();
// Application
const app = express();
// setting app variables
appVars(app);
// setting app configs
app.use('/', express.static(path.join(__dirname, '..', '..', 'public')));
app.use('/static', express.static(path.join(__dirname, '..', '..', 'static')));
app.use(favicon(path.join(__dirname, '..', '..', 'static', 'favicon.ico')));
app.use(cors());
helmet(app);
app.use(cookieSession({
  name: 'FV_portfolio',
  keys: [process.env.SECRET, process.env.AUTH_TOKEN],
  maxAge: moment().add(Number(process.env.TOKEN_LIFE), 'days'),
  signed: true,
}));
app.use(deviceDetection());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(fileStorage);
// API router
ApiRouter(app);
// Environment Config
import(isDev ? './configs/development' : './configs/production')
  .then(serverConfig => serverConfig.default(app));
// Error handler Middleware
app.use(errorHandler(isDev));
// server starts
app.listen(app.get('port'), (err) => {
  if (!err && !isAnalyzer) {
    console.info(`Server listening on ${process.env.APP_URL}`);
  } else if (!err && isAnalyzer) {
    console.info(`Client report on ${process.env.APP_URL}/static/clientReport.html`);
    console.info(`Server report on ${process.env.APP_URL}/static/serverReport.html`);
  }
});
