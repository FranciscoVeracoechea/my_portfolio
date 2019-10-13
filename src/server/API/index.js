// Routers
import UserRouter from './UserRouter';
import DataRouter from './DataRouter';
import InterestRouter from './InterestRouter';
import FileRouter from './FileRouter';

// Apply ruotes
export default (app, uploads) => {
  app.use('/api/user', UserRouter());
  app.use('/api/data', DataRouter());
  app.use('/api/file', FileRouter(uploads));
  app.use('/api/interest', InterestRouter());
};
