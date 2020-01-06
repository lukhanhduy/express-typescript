import * as _ from 'lodash';
export const HTTP_CONFIG = {
	InternalServerError: {
		code: 500,
		name: "Unprocessable Entity"
	},
	BadRequest: {
		code: 400,
		name: "Bad Request"
	},
	Unauthorized: {
		code: 401,
		name: "Unauthorized"
	},
	OK: {
		code: "200",
		name: "OK"
	},
	Created: {
		code: 201,
		name: "Created"
	},
	Accepted: {
		code: 202,
		name: "Accepted"
	},
	NotAcceptable: {
		code: 406,
		name: "Not Acceptable",
		description: "cannot find entity in system "
	},
	UnprocessableEntity: {
		code: 422,
		name: "Unprocessable Entity",
		description: "validate data input failed"
	}
}
export class HttpService {
	/**
	 * response success data 
	 * @param resData 
	 * @param statusCode 
	 */
	public static responseSuccess(resData: any = {}, message?: string, statusCode = HTTP_CONFIG.OK.code) {
		return {
			statusCode,
			message,
			data: {
				item: _.get(resData, 'item'),
				items: _.get(resData, 'items'),
				total: _.get(resData, 'total'),
				pageSize: _.get(resData, 'pageSize'),
				pageNumber: _.get(resData, 'pageNumber')
			}
		}
	}
	public static responseFailed(errorData: any = {}, statusCode = HTTP_CONFIG.InternalServerError.code) {
		return {
			statusCode,
			message: _.get(errorData, 'message'),
			data: {
				errors: _.get(errorData, 'errors')
			}
		}
	}
	public static parseResult(data: any, fields: any) {
		return _.pick(data, fields);
	}
}