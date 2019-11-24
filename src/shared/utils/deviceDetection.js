// dependencies
import { fromEvent } from 'rxjs';
import {
  throttleTime, map, mapTo,
} from 'rxjs/operators';
// action
import { resolutionKind } from '../actions/deviceActions';
import { match, compose } from './functional';


const isTouch = 'ontouchstart' in window || 'ontouchstart' in document.documentElement;
const deviceData = [
  {
    media: '(max-width: 599px)',
    pagination: 3,
    resolutionKind: 'mobile',
  },
  {
    media: '(max-width: 960px)',
    pagination: 6,
    resolutionKind: 'tablet',
  },
  {
    media: '(max-width: 1600px)',
    pagination: 9,
    resolutionKind: 'desktop',
  },
  {
    media: '(min-width: 1601px)',
    pagination: 12,
    resolutionKind: 'tv',
  },
];


// Get device
export const getResolutionKind = () => ({
  ...deviceData.find(d => match(d.media).matches),
  isTouch,
});

export const setInitialDevice = dispatch => compose(
  dispatch, resolutionKind, getResolutionKind,
)();

// deveice listener
export const resolution$ = fromEvent(window, 'resize').pipe(
  throttleTime(250),
  mapTo(getResolutionKind()),
  map(resolutionKind),
);
