// dependeices
import fs from 'fs';
import { readFile } from './TaskFs';


const SECRET = './keys/secret.key';
const AUTH_TOKEN = './keys/authToken.key';

export const getAuthToken = () => readFile(AUTH_TOKEN);
export const getSecret = () => readFile(SECRET);

export const getKeysSync = () => ({
  SECRET: fs.readFileSync(SECRET, 'utf8'),
  AUTH_TOKEN: fs.readFileSync(AUTH_TOKEN, 'utf8'),
});


export const populateProcessEnv = () => {
  const keys = getKeysSync();
  Object.keys(keys).forEach((key) => {
    if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
      process.env[key] = keys[key];
    }
  });
};
