// dependencies
import React from 'react';
// font awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCodeBranch, faUserNinja, faAddressCard, faPhone,
  faStar, faBriefcase,
} from '@fortawesome/free-solid-svg-icons';
// import { far } from '@fortawesome/free-regular-svg-icons';
import {
  faReact, faInstagram, faGithubSquare, faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
// Components
import AppBar from './AppBar';


library.add(
  faReact, faCodeBranch, faUserNinja, faInstagram, faGithubSquare, faLinkedin,
  faAddressCard, faPhone, faStar, faBriefcase,
);

const App = ({ children }) => (
  <div>
    <AppBar />
    <main>
      { children }
    </main>
  </div>
);

export default App;
