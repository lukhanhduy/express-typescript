import { GLOBAL } from "../../configs/global";
import { Request } from "express";
import * as _ from 'lodash';
import { HTTP_CONFIG, HttpService } from "../services";
const ValidatorJS = require('validatorjs');
export class Validate {
  /**
   * extend validate to handle for request
   * @param data 
   * @param rules 
   * @param locale 
   */
  public static isValidated(req: Request, rules: any) {
    try {
      let data = _.get(req, 'data', {});
      let validation = new ValidatorJS(data, rules);
      if (validation.fails()) {
        req.validateErrors = validation.errors.all();
      }
    } catch (error) {
      throw HttpService.responseFailed({
        message: HTTP_CONFIG.InternalServerError.name
      },
        HTTP_CONFIG.InternalServerError.code
      );
    }

  }
}