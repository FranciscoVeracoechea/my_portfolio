// Dependencies
import React from 'react';
import { setConfig, hot } from 'react-hot-loader';
import {
  Switch, Route, Redirect,
} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
// theme
import theme from './theme.js';
// Client App
import App from '../client/components/App';
// Routes
import routes from './routes';
import useRouter from '../client/hooks/useRouter';
// animate
import AnimatedView from '../client/components/Wrappers/AnimatedView';


const Root = () => {
  const { location } = useRouter();
  return (
    <ThemeProvider theme={theme}>
      <App>
        <AnimatedView location={location}>
          {
            newLocation => (
              <Switch location={newLocation}>
                { routes.map(props => <Route key={props.path} {...props} />) }
                <Route render={() => <Redirect to="/" />} />
              </Switch>
            )
          }
        </AnimatedView>
      </App>
    </ThemeProvider>
  );
};

setConfig({
  ignoreSFC: true,
  pureRender: true,
});

export default hot(module)(Root);
