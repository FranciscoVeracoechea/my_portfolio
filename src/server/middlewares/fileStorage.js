import multer from 'multer';
import path from 'path';
import { Types } from 'mongoose';


const getFileName = ({ originalname }) => `${Types.ObjectId()}.${originalname.split('.').pop()}`;
const destination = path.join(__dirname, '..', '..', '..', 'static', 'uploads');

export default multer({
  dest: destination,
  storage: multer.diskStorage({
    filename: (req, file, callback) => callback(null, getFileName(file)),
    destination,
  }),
}).single('file');
