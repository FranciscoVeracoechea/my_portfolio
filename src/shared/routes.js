// @flow
import type { Component } from 'react';
import type { Observable } from 'rxjs';
import type { Store } from 'redux';
import type { Match } from 'react-router-dom';
import type { Request, Response } from 'express';
import type {
  Action, ThunkAction,
} from './co[nfigureStore';
// Pages
import About from '../client/pages/About';
import Home from '../client/pages/Home';
import Auth from '../client/pages/Auth';
import Dashboard from '../client/pages/Dashboard';


type Props = {};
type State = {};

export interface Pageable {
  initialAction(store: Store, match: Match, req: Request, res: Response): Observable<mixed>
  | Promise<mixed>
  | Action
  | ThunkAction;
  render(void): Element<any>;
}

export type Route = {
  path: string,
  component: Pageable & Component<Props, State>,
  exact?: boolean,
  sensitive?: boolean,
  strict?: boolean,
  protected?: boolean,
};

const routes: Array<Route> = [
  {
    path: '/',
    component: Home,
    exact: true,
  }, {
    path: '/about',
    component: About,
  }, {
    path: '/enter-the-matrix',
    component: Auth,
  }, {
    path: '/dashboard/:section?',
    component: Dashboard,
    protected: true,
  },
];

export default routes;
