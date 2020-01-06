import { Request, Response } from 'express';
import * as _ from 'lodash';
import { GLOBAL } from '../../configs/global';
import { __ } from 'i18n';
module.exports = (req: Request, res: Response, next: () => void) => {
	req.data = { ...req.params, ...req.body };
	req.locale = _.get(req.headers, 'locale', GLOBAL.DEFAULT_LANG);
	req.setLocale(req.locale);
	// console.log(req.__('example',{me: "duy"}));
	return next();
}