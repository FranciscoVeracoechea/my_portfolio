// dependencies
import React from 'react';
// font awesome
import { library, config } from '@fortawesome/fontawesome-svg-core';
import {
  faCodeBranch, faAddressCard, faPhone,
  faStar, faBriefcase, faDrum, faBirthdayCake, faCalendarAlt,
  faMale, faGlobeAmericas, faUser, faMapMarkerAlt, faEnvelope,
  faFutbol, faMusic, faCode, faCoffee, faLaptopCode, faFileAlt,
  faInfoCircle, faFilePdf,
} from '@fortawesome/free-solid-svg-icons';
// import { far } from '@fortawesome/free-regular-svg-icons';
import {
  faReact, faInstagram, faGithubSquare, faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
// Components
import AppBar from './AppBar';


config.autoAddCss = false;
library.add(
  faReact, faCodeBranch, faInstagram, faGithubSquare, faLinkedin,
  faAddressCard, faPhone, faStar, faBriefcase, faDrum, faBirthdayCake,
  faCalendarAlt, faMale, faGlobeAmericas, faUser, faMapMarkerAlt, faEnvelope,
  faFutbol, faMusic, faLaptopCode, faCode, faCoffee, faFileAlt, faInfoCircle,
  faFilePdf,
);


const App = ({ children }) => (
  <>
    <AppBar />
    <main>
      { children }
    </main>
  </>
);

export default App;
