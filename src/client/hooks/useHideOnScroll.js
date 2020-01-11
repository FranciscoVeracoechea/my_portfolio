import { useState, useEffect } from 'react';
import { fromEvent } from 'rxjs';
import { throttleTime, map } from 'rxjs/operators';
// import { useObservable } from 'rxjs-hooks';
import root from 'window-or-global';


const HideOnScroll = () => {
  const defaultStyles = {
    transition: '.4s top ease',
    zIndex: 100,
  };
  const [lastScroll, setLastScroll] = useState(0);
  const [styles, setStyles] = useState(defaultStyles);
  const [scroll$, setScroll$] = useState(null);

  useEffect(() => setScroll$(fromEvent(root, 'scroll')), []);

  useEffect(() => {
    if (scroll$) {
      const subscriber = scroll$.pipe(
        throttleTime(1000),
        map(() => root.pageYOffset || document.documentElement.scrollTop),
      ).subscribe((scrollTop) => {
        if (scrollTop > lastScroll) {
          setStyles({
            ...defaultStyles,
            top: '-4em',
          });
        } else {
          setStyles({
            ...defaultStyles,
            top: '0',
          });
        }
        setLastScroll(scrollTop);
      });
      return () => subscriber.unsubscribe();
    }
  }, [lastScroll, styles, defaultStyles]);

  return styles;
};

export default HideOnScroll;
