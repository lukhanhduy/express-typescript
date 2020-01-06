import * as bcrypt from 'bcrypt';
import { GLOBAL } from '../../configs/global';
import jwt = require("jsonwebtoken");
import { env } from '../helpers';

export class Hash {

  /**
   * encrypt to hash
   * @param string 
   */

  public static encrypt(string: string) {
    return bcrypt.hashSync(string, GLOBAL.SALT_ROUND);
  }

  /**
   * compare hash and string is valid 
   */
  public static compare(string: string, hash: string) {
    return bcrypt.compareSync(string, hash)
  }

  /**
   * create token by jwt
   * @param data 
   */
  public static createToken(data: any): TokenData {
    const expiresIn = 60 * 60; // an hour
    return {
      expiresIn,
      token: jwt.sign(data, env("JWT_SECRET"), { expiresIn }),
    };
  }

  /**
   * decode token to get info
   * @param token 
   */
  public static decodeToken(token: any) {
    try {
      let decoded = jwt.verify(token, env("JWT_SECRET"));
      return decoded;
    } catch (err) {
      return null;
    }
  }
}