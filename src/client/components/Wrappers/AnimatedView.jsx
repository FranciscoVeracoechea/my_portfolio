import React, { useState } from 'react';
import { useObservable } from 'rxjs-hooks';
import Result from 'folktale/result';
import {
  Fade,
} from '@material-ui/core';
import {
  delay, tap, filter,
} from 'rxjs/operators';


const setState = (setLocation, setShow) => ([location, path]) => {
  const validation = path.includes('/dashboard')
    ? Result.Ok(location)
    : Result.Error(false);

  validation.matchWith({
    Ok: ({ value }) => {
      setLocation(value);
      setShow(true);
    },
    Error: ({ value }) => setShow(value),
  });
};


const AnimatedView = ({ children, location }) => {
  const timeout = 500;
  const [show, setShow] = useState(false);
  const [newLocation, setLocation] = useState(location);

  useObservable(inputs$ => inputs$.pipe(
    tap(setState(setLocation, setShow)),
    filter(([_, path]) => !path.includes('/dashboard')),
    delay(timeout + 10),
    tap(([l]) => {
      setLocation(l);
      setShow(true);
    }),
  ), false, [location, location.pathname]);

  return (
    <Fade timeout={timeout} in={show} mountOnEnter unmountOnExit>
      <div>
        {children(newLocation)}
      </div>
    </Fade>
  );
};

export default AnimatedView;
