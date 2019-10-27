import morgan from 'morgan';
import webpackDevServer from './webpackDevServer';


export default (app) => {
  app.use(morgan('dev'));
  webpackDevServer(app);
};
