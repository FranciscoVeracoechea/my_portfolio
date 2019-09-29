import React, { useState } from 'react';
import { useObservable } from 'rxjs-hooks';
import {
  Fade,
} from '@material-ui/core';
import {
  delay, tap,
} from 'rxjs/operators';


const AnimatedView = ({ children, location }) => {
  const timeout = 500;
  const [show, setShow] = useState(false);
  const [newLocation, setLocation] = useState(location);

  useObservable(inputs$ => (
    !location.pathname.includes('/dashboard')
      ? inputs$.pipe(
        tap(() => setShow(false)),
        delay(timeout + 10),
        tap(([l]) => {
          setLocation(l);
          setShow(true);
        }),
      )
      : inputs$.pipe(
        tap(([l]) => {
          setLocation(l);
          setShow(true);
        }),
      )
  ), false, [location]);

  return (
    <Fade timeout={timeout} in={show} mountOnEnter unmountOnExit>
      <div>
        {children(newLocation)}
      </div>
    </Fade>
  );
};

export default AnimatedView;
