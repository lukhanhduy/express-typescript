import { UserRepository } from '../repositories';
import { autoInjectable } from 'tsyringe';
import BaseService from './base.service';
import { User } from '../interfaces';
import { USER_CONFIG } from '../configs/constant';
// import { Repository } from '../core/decorators';
@autoInjectable()
// @Repository([])
export default class UserService extends BaseService {
  private userRepository: UserRepository = this.models.UserRepository;
  /**
   * find a user has phoneNumber or email registed
   * @param data  email, phoneNumber
   */
  fnFindByEmailOrPhone(user: User) {
    const {
      email,
      phoneNumber
    } = user;
    return this.userRepository.findOne({
      where: {
        or: [
          { email },
          { phoneNumber }
        ]
      }
    });
  }
  /**
   * create user
   * @param user 
   */
  fnRegister(user: User) {
    return this.userRepository.create(user).save();
  }

  /**
   * find user id 
  */
  fnCheckValidUser(user: User) {
    const {
      userId
    } = user;
    return this.userRepository.findOne({
      where: {
        userId,
        status: USER_CONFIG.STATUS.ACTIVE
      }
    })
  }
}