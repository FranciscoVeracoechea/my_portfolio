import { Helmet } from 'react-helmet';
import serialize from 'serialize-javascript';


const helmet = Helmet.renderStatic();

export default ({
  hash,
  browserEnv = {},
  markup,
  state,
  css,
}) => `
<!DOCTYPE html>
<html ${helmet.htmlAttributes.toString()}>
  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
    ${helmet.link.toString()}
    <style id="jss-server-side" type="text/css">${css}</style>
    <link rel="icon" href="/static/favicon.ico?hash=${hash}">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <link rel="stylesheet" type="text/css" href="/styles.${hash}.css"/>
    <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet">
  </head>
  <body ${helmet.bodyAttributes.toString()}>
    <div id="root">${markup}</div>
    <script>
      window.__STATE__ = ${serialize(state)};
      window.browserEnv = ${serialize(browserEnv)};
    </script>
    <script src="/bundle.${hash}.js"></script>
  </body>
</html>`;
