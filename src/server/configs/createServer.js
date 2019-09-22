import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';


const key = path.join(__dirname, '..', '..', '..', 'ssl', 'server.key');
const cert = path.join(__dirname, '..', '..', '..', 'ssl', 'server.crt');

export default (isDev, app) => (
  !isDev
    ? https.Server({
      key: fs.readFileSync(key),
      cert: fs.readFileSync(cert),
    }, app)
    : http.Server(app)
);
