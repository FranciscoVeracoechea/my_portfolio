import root from 'window-or-global';
import xh2 from 'xhr2';
import { ajax } from 'rxjs/ajax';
import {
  map,
} from 'rxjs/operators';
import { Subscriber, Observable } from 'rxjs';
import { union } from 'folktale/adt/union';

// CONSTANTS
const baseUrl = root.browserEnv.appUrl;
const globalHeaders = {
  Accept: 'application-json',
};
export const isServer = typeof XMLHttpRequest === 'undefined';
export const XHR = !isServer ? XMLHttpRequest : xh2;
// Types AjaxUpdate
export const { ProgressEvent, Response } = union('AjaxUpdate', {
  ProgressEvent(progressEvent) { return { progressEvent }; },
  Response(response) { return { response }; },
});

// helper
const getUrl = (options) => {
  const { useBaseUrl, url } = options;
  if (typeof useBaseUrl === 'undefined') {
    return isServer ? `${baseUrl}${url}` : url;
  }
  return options.useBaseUrl && options.url ? `${baseUrl}${options.url}` : options.url;
};
// normal request
const request = (options) => {
  const configs = {
    ...options,
    url: getUrl(options),
    headers: { ...globalHeaders, ...options.headers },
  };
  return ajax({
    createXHR: () => new XHR(),
    ...configs,
  });
};
// with progress subscriber
const requestWithProgress = req => new Observable((subscriber) => {
  const progressSubscriber = new Subscriber(
    progressEvent => subscriber.next(ProgressEvent(progressEvent)),
    error => subscriber.error(error),
    // Forward next and error but not complete
    // When progress is complete, we send the response *then* complete.
    () => {},
  );
  const ajax$ = request({
    ...req,
    progressSubscriber,
  });
  const subscription = ajax$
    .pipe(map(({ response }) => Response(response)))
    .subscribe(subscriber);
  return () => subscription.unsubscribe();
});

export default options => (
  options.withProgress === true
    ? requestWithProgress(options)
    : request(options)
);
