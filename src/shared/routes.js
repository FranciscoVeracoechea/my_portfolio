// Pages
import About from '../client/pages/About';
import Home from '../client/pages/Home';
import Auth from '../client/pages/Auth';
import Dashboard from '../client/pages/Dashboard';
import Skills from '../client/pages/Skills';


const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
  }, {
    path: '/about-me',
    component: About,
  }, {
    path: '/enter-the-matrix',
    component: Auth,
  }, {
    path: '/dashboard/:section?',
    component: Dashboard,
    protected: true,
  }, {
    path: '/skills',
    component: Skills,
  },
];

export default routes;
