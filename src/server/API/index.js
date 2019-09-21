// Routers
import UserRouter from './UserRouter';
import DataRputer from './DataRouter';
import InterestRouter from './InterestRouter';

// Apply ruotes
export default (app) => {
  app.use('/api/user', UserRouter());
  app.use('/api/data', DataRputer());
  app.use('/api/interest', InterestRouter());
};
