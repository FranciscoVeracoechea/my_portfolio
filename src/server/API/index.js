import UserRouter from './UserRouter';
import DataRputer from './DataRouter';


export default (app) => {
  app.use('/api/user', UserRouter());
  app.use('/api/data', DataRputer());
};
