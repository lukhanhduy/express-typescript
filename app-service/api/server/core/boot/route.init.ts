import { Application, Request, Response } from "express";
import { CONTROLLERS } from "../../controllers";
import { IRouteDefinition } from "../routes";
import { Validate } from "../helpers/validate";
import * as _ from 'lodash';
import { HTTP_CONFIG, HttpService } from "../services";
module.exports = (app: Application) => {
	CONTROLLERS.forEach((controller: any) => {
		// This is our instantiated class
		const instance: any = new controller();
		// The prefix saved to our controller
		const prefix = Reflect.getMetadata("prefix", controller);
		// Our `routes` array containing all our routes for this controller
		const routes: IRouteDefinition[] = Reflect.getMetadata("routes", controller);

		// Iterate over all routes and register them to our express application
		routes.forEach((route) => {
			// It would be a good idea at this point to substitute the `app[route.requestMethod]` with a `switch/case` statement
			// since we can't be sure about the availability of methods on our `app` object. But for the sake of simplicity
			// this should be enough for now.
			let rules = _.get(route, 'options.rules', {});
			const {
				middlewares = []
			} = route.options;
			/**
			 * custom get all params in query and body to data field
			 */
			const handleBeforeRemote: any = [
				require('./../middlewares/request.middleware'),
				...middlewares
			];
			app[route.requestMethod](prefix + route.path, handleBeforeRemote, (req: Request, res: Response) => {
				// Execute our method for this path and pass our express request and response object.
				try {
					Validate.isValidated(req, rules);
					if (req.validateErrors) {
						return res.status(
							HTTP_CONFIG.UnprocessableEntity.code
						).send(
							HttpService.responseFailed({
								errors: req.validateErrors
							},
								HTTP_CONFIG.UnprocessableEntity.code
							)
						);
					}
				} catch (error) {
					return res.status(
						HTTP_CONFIG.UnprocessableEntity.code
					).send(error);
				}
				instance[route.methodName](req, res);
			});

		});
	});
};
