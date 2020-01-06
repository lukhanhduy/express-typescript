import { Request, Response } from "express";
import { cloudinary } from './../libs';
import * as _ from 'lodash';

//multer.diskStorage() creates a storage space for storing files. 

export class FileService {
  public static uploadFiles(req: Request, res: Response) {
    const upload = cloudinary.single("image");
    return upload;
  }
  /**
  * parse file data to save database
  * @param file 
  */
  public static parseFileData(file: any) {
    return {
      url: _.get(file, 'url'),
      createdAt: _.get(file, 'created_at'),
      height: _.get(file, 'height'),
      weight: _.get(file, 'weight'),
      signature: _.get(file, 'signature'),
      mimetype: _.get(file, 'mimetype'),
      fileName: `${_.get(file, 'public_id')}.${_.last(_.split(_.get(file, 'mimetype'), '/'))}`
    }
  }
}