import { Request, Response } from "express";
import { autoInjectable } from "tsyringe";
import * as _ from 'lodash';
import { Controller, Get, Post } from "./../core/decorators";
import { BaseController } from "./base.controller";
import { HttpService, HTTP_CONFIG } from "../core/services";
import UserService from "../services/user.service";
import { UserValidate } from "../validates";
import { __ } from "i18n";
import { Hash } from "../core/libs";
import { User } from "../interfaces";
import { UserResponse } from "../responses";
import { USER_CONFIG } from "../configs/constant";
import { UserMiddleware } from "../middlewares";
@autoInjectable()
@Controller("/users")
export default class UserController extends BaseController {
	constructor(
		private userService: UserService
	) {
		super();
	}
	/**
	* @api {post} /user/register Register User
	* @apiName Register
	* @apiGroup User
	*
	* @apiParam {String} firstName User's first name.
	* @apiParam {String} lastName User's last name.
	* @apiParam {String} email User's email.
	* @apiParam {String} phoneNumber User's phone.
	*
	* @apiErrorExample {curl} Errors:
	*     curl -i {{url}}/users/register/success
	* @apiSuccessExample {curl} Success:
	*     curl -i {{url}}/example/users/register/errors
	 */

	@Post("/register", { rules: UserValidate.validateRegister })
	public async fnRegister(req: Request, res: Response) {
		try {
			const {
				firstName,
				lastName,
				email,
				password,
				phoneNumber
			} = req.data;
			let isExist = await this.userService.fnFindByEmailOrPhone({ email, phoneNumber });
			if (isExist) {
				return res
					.status(HTTP_CONFIG.NotAcceptable.code)
					.send(
						HttpService.responseFailed(
							{ message: __('errors.existUser') },
							HTTP_CONFIG.NotAcceptable.code
						)
					)
			}
			let user = await this.userService.fnRegister({
				firstName,
				lastName,
				email,
				password,
				phoneNumber,
				status: USER_CONFIG.STATUS.ACTIVE
			});
			console.log(user);
			if (user) {
				return res.send(
					HttpService.responseSuccess({}, __('success.registed'))
				);
			}
			return res
				.status(HTTP_CONFIG.InternalServerError.code)
				.send(
					HttpService.responseFailed(
						{ message: __('errors.errorCreate') },
						HTTP_CONFIG.NotAcceptable.code
					)
				)
		} catch (error) {
			return res
				.status(HTTP_CONFIG.InternalServerError.code)
				.send(
					HttpService.responseFailed(
						{ message: __('errors.unkown') },
						HTTP_CONFIG.NotAcceptable.code
					)
				)
		}
	}

	/**
	* @api {post} /user/login Login to account
	* @apiName Register
	* @apiGroup User
	*
	* @apiParam {String} firstName User's first name.
	* @apiParam {String} lastName User's last name.
	* @apiParam {String} email User's email.
	* @apiParam {String} phoneNumber User's phone.
	*
	* @apiErrorExample {curl} Errors:
	*     curl -i {{url}}/users/register/success
	* @apiSuccessExample {curl} Success:
	*     curl -i {{url}}/example/users/register/errors
	 */

	@Post("/login", { rules: UserValidate.validateLogin, middlewares: [ UserMiddleware.isLogged] })
	public async fnLogin(req: Request, res: Response) {
		try {
			const {
				email = '',
				password = '',
				phoneNumber = ''
			} = req.data;
			let user: User = await this.userService.fnFindByEmailOrPhone({ email, phoneNumber });
			if (!user || !Hash.compare(password, user.password)) {
				return res
					.status(HTTP_CONFIG.NotAcceptable.code)
					.send(
						HttpService.responseFailed(
							{ message: __('errors.notExistUser') },
							HTTP_CONFIG.NotAcceptable.code
						)
					)
			}
			let accessToken = Hash.createToken({
				userId: user.userId,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				phoneNumber: user.phoneNumber
			});
			return res.send(
				HttpService.responseSuccess({
					item: {
						accessToken,
						user: HttpService.parseResult(user,UserResponse.Login)
					}
				}, __('success.logged'))
			);
		} catch (error) {
			return res
				.status(HTTP_CONFIG.InternalServerError.code)
				.send(
					HttpService.responseFailed(
						{ message: __('errors.unkown') },
						HTTP_CONFIG.NotAcceptable.code
					)
				)
		}
	}
}
