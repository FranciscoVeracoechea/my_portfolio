import path from 'path';
// middleware
import gzip from '../middlewares/gzip';


export default (app) => {
  app.get('bundle.*.js', gzip());
  const SSR_PATH = path.join(__dirname, '..', '..', '..', 'dist', 'serverSideRender.js');
  const STATS_PATH = path.join(__dirname, '..', '..', '..', 'compilationStats.json');
  Promise.all([import(SSR_PATH), import(STATS_PATH)])
    .then(([{ default: serverRenderer }, { default: clientStats }]) => {
      app.use(
        serverRenderer(
          { browserEnv: app.get('browserEnv'), clientStats }
        )
      );
    });
};
