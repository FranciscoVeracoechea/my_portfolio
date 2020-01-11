import fs from 'fs';
import { waitAll } from 'folktale/concurrency/task';
import { writeFile } from '../src/shared/utils/TaskFs';
import getToken from '../src/shared/utils/getToken';


console.info('React Universal Nightmare: generating keys...');
const secret = getToken();
const authToken = getToken();

if (!fs.existsSync('./keys')) {
  fs.mkdirSync('./keys');
}

waitAll([
  writeFile('./keys/secret.key', secret),
  writeFile('./keys/authToken.key', authToken),
]).run().listen({
  onRejected: (reason) => {
    console.error(reason);
    process.exit(1);
  },
  onResolved: (value) => {
    value.forEach(({ path, data }) => {
      console.info(`${path} has been saved!`);
      console.info(data);
    });
    process.exit(0);
  },
});
