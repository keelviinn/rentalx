import multer from 'multer';
import crypto from 'crypto';
import { resolve } from 'path';

export default {

  upload(folder: string): any {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', 'tmp', folder),
        filename(request, file, callback) {
          const hash = crypto.randomBytes(6).toString('hex');
          const fileName = `${hash}-${file.originalname}`;

          return callback(null, fileName);
        }
      })
    }
  }
}