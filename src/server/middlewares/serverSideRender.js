// Dependencies
import React from 'react';
import { renderToString } from 'react-dom/server';
import { matchPath, StaticRouter } from 'react-router-dom';
import { ServerStyleSheets } from '@material-ui/styles';
import { Provider } from 'react-redux';
import {
  isObservable, of, Subject, combineLatest,
} from 'rxjs';
import isPromise from 'is-promise';
import {
  filter, mergeMap, map, tap, withLatestFrom, takeLast, defaultIfEmpty, scan, mapTo,
} from 'rxjs/operators';
// actions
import { setUADevice } from '../../shared/actions/deviceActions';
import { saveUserFromServer } from '../../shared/actions/authActions';
// Store
import configureStore from '../../shared/configureStore';
import Root from '../../shared/RootComponent';
import htmlTemplate from '../htmlTemplate';
// Routes
import routes from '../../shared/routes';
// utils
import { isArray } from '../../shared/utils/functional';


const routes$ = of(...routes);
const ssr$ = new Subject();
const serverData$ = new Subject();
const dispatch$ = new Subject();

const routesStream = ({ req, res, store }) => routes$.pipe(
  filter(route => route.component && route.component.initialAction),
  map(route => ({ ...route, match: matchPath(req.url, route) })),
  filter(route => route.match),
  map(({ component, match }) => component.initialAction(store, match, req, res)),
  map(action => (
    isObservable(action) || isPromise(action)
      ? action
      : of(action)
  )),
  mergeMap(values => combineLatest(values)),
  map(([action]) => action),
  scan((acc, current) => [...acc, current], []),
  takeLast(1),
  tap(actions => isArray(actions) && actions.forEach(
    action => action && dispatch$.next({ store, action })
  )),
  mapTo({ req, res, store }),
  defaultIfEmpty({ req, res, store })
);

dispatch$.pipe(
  map(({ store: { dispatch }, action }) => ({ dispatch, action }))
).subscribe(({ dispatch, action }) => dispatch(action));

ssr$.pipe(
  tap(({ store, req }) => dispatch$.next({ store, action: setUADevice(req) })),
  tap(({ store, req }) => (
    req.session && req.session.isAuthenticated && req.session.user
      ? dispatch$.next({ store, action: saveUserFromServer(req) })
      : null
  )),
  mergeMap(ssr => routesStream(ssr)),
  withLatestFrom(serverData$),
).subscribe(([
  { req, res, store },
  { browserEnv, hash },
]) => {
  if (res.headersSent) return;

  const context = {};
  const sheets = new ServerStyleSheets();
  const markup = renderToString(
    sheets.collect(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <Root />
        </StaticRouter>
      </Provider>
    )
  );
  if (context.url) {
    res.redirect(302, context.url);
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(
      htmlTemplate({
        state: store.getState(),
        markup,
        browserEnv,
        hash,
        css: sheets.toString(),
      })
    );
  }
});

export default ({ browserEnv, clientStats: { hash } }) => {
  serverData$.next({ browserEnv, hash });
  return (req, res) => {
    ssr$.next({ req, res, store: configureStore({ location: req.url, server: true }).store });
  };
};
