import { BadRequestException } from '@nestjs/common';
import { extname } from 'path';

export function fileFilter(mimetypes?: string[], extensions?: string[]) {
  return (req: Request, file: Express.Multer.File, cb: any) => {
    let isValid = false;
    if (!mimetypes && !extensions) isValid = true;

    if (mimetypes && mimetypes.some((ft) => file.mimetype.startsWith(ft))) isValid = true;

    if (extensions) {
      const ext = extname(file.originalname);
      if (extensions.includes(ext)) isValid = true;
    }
    if (isValid) cb(null, true);
    else cb(new BadRequestException('Invalid file type'), false);
  };
}
