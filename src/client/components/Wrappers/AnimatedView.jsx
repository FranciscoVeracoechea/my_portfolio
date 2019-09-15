import React, { useState } from 'react';
import { useObservable } from 'rxjs-hooks';
import {
  Fade,
} from '@material-ui/core';
import {
  delay, tap,
} from 'rxjs/operators';


const AnimatedView = ({ children, location }) => {
  const [show, setShow] = useState(false);
  const [newLocation, setLocation] = useState(location);

  useObservable(inputs$ => inputs$.pipe(
    tap(() => setShow(false)),
    delay(400),
    tap(([l]) => {
      setLocation(l);
      setShow(true);
    }),
  ), false, [location]);

  return (
    <Fade in={show} mountOnEnter unmountOnExit>
      <div>
        {children(newLocation)}
      </div>
    </Fade>
  );
};

export default AnimatedView;
