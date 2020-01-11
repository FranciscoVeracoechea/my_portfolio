// Routers
import UserRouter from './UserRouter';
import DataRouter from './DataRouter';
import InterestRouter from './InterestRouter';
import FileRouter from './FileRouter';
import TechnologyRouter from './TechnologyRouter';

// Apply ruotes
export default (app) => {
  UserRouter(app, '/api/user');
  DataRouter(app, '/api/data');
  FileRouter(app, '/api/file');
  InterestRouter(app, '/api//api/interest');
  TechnologyRouter(app, '/api/technology');
};
