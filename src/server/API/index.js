// Routers
import UserRouter from './UserRouter';
import DataRouter from './DataRouter';
import InterestRouter from './InterestRouter';
import FileRouter from './FileRouter';
import TechnologyRouter from './TechnologyRouter';

// Apply ruotes
export default (app) => {
  UserRouter().forEach(router => app.use('/api/user', router));
  DataRouter().forEach(router => app.use('/api/user', router));
  FileRouter().forEach(router => app.use('/api/user', router));
  InterestRouter().forEach(router => app.use('/api/user', router));
  TechnologyRouter().forEach(router => app.use('/api/user', router));
};
