// dependencies
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// magterial-ui icons
import DashboardIcon from '@material-ui/icons/Dashboard';
import CodeIcon from '@material-ui/icons/Code';
// components
import AboutMe from '../../components/AboutMe';
import Contact from '../../components/Contact';
import Dashboard from '../../components/Dashboard';
import Experience from '../../components/Experience';
import Interests from '../../components/Interests';
import Technologies from '../../components/Technologies';


const setIcon = (icon = 'address-card') => () => <FontAwesomeIcon icon={icon} />;

export default [
  {
    text: 'Dashboard',
    Icon: DashboardIcon,
    Component: Dashboard,
    route: '/dashboard',
    exact: true,
  },
  {
    text: 'About Me',
    Icon: setIcon('address-card'),
    Component: AboutMe,
    route: '/dashboard/about-me',
  },
  {
    text: 'Contact',
    Icon: setIcon('phone'),
    Component: Contact,
    route: '/dashboard/contact',
  },
  {
    text: 'Experience',
    Icon: setIcon('briefcase'),
    Component: Experience,
    route: '/dashboard/experience',
  },
  {
    text: 'Interests',
    Icon: setIcon('star'),
    Component: Interests,
    route: '/dashboard/interests',
  },
  {
    text: 'Technologies',
    Icon: CodeIcon,
    Component: Technologies,
    route: '/dashboard/technologies',
  },
];
