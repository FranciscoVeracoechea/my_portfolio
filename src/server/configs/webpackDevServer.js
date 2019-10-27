import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import config from '../../../webpack/webpack.config.js';


const reporter = (middlewareOptions, options) => {
  const { log, state, stats } = options;
  let message = 'Compiled successfully.';
  if (state) {
    const displayStats = middlewareOptions.stats !== false;
    const statsString = stats.toString(middlewareOptions.stats);
    // displayStats only logged
    if (displayStats && statsString.trim().length) {
      if (stats.hasErrors()) {
        log.error(statsString);
      } else if (stats.hasWarnings()) {
        log.warn(statsString);
      }
    }
    if (stats.hasErrors()) {
      message = 'Failed to compile.';
    } else if (stats.hasWarnings()) {
      message = 'Compiled with warnings.';
    }
    log.info(message);
  }
};

export default (app) => {
  const compiler = webpack(config);
  const devMiddleware = webpackDevMiddleware(compiler, {
    serverSideRender: true,
    reporter,
  });
  console.info('Universal React Nightmare -> Compiling...');
  app.use(devMiddleware);
  app.use(webpackHotMiddleware(compiler.compilers.find(c => c.name === 'client')));
  app.use(webpackHotServerMiddleware(compiler, {
    serverRendererOptions: {
      browserEnv: app.get('browserEnv'),
    },
  }));
};
