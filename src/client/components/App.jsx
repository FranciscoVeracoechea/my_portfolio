// dependencies
import React from 'react';
// font awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
// Components
import AppBar from './AppBar';


library.add(fas, far, fab);

const App = ({ children }) => (
  <div>
    <AppBar />
    <main>
      { children }
    </main>
  </div>
);

export default App;
