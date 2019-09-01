import BlogRouter from './BlogRouter';
import UserRouter from './UserRouter';


export default (app) => {
  app.use('/api/blog', BlogRouter());
  app.use('/api/user', UserRouter());
};
