import express from "express";
import { createServer } from "http";
import "reflect-metadata";
import { env } from "./core/helpers";
import * as bodyParser from 'body-parser';
import i18n from 'i18n';
import { createConnection, Connection } from "typeorm";
import { resExample } from './../example'
class App {
	private app: express.Application;
	constructor() {
		this.app = express();
		this.start();

	}
	public async start() {
		this.app.use(bodyParser.json());       // to support JSON-encoded bodies
		this.app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
			extended: true
		}));
		/**
		 * async all file on locales folder for multiple language
		 */
		i18n.configure({
			locales: ['en', 'vi'],
			directory: __dirname + '/locales',
			objectNotation: true 
		});
		/**
		 * init translation
		 */
		this.app.use(i18n.init);
		/**
		 * init docs
		 */
		this.app.use('/docs', express.static('docs'));
		this.app.get("/example/:md/:fnc/:type", (req: express.Request, res: express.Response) => {
			const {
				md,
				fnc,
				type
			} = req.params;
			res.type('json').send(JSON.stringify(resExample(md, fnc, type), null, 2) + '\n');
		});
		this.app.get("/", (req: express.Request, res: express.Response) => {
			res.send("Hello world!");
		});
		/**
		 * map and init all controller
		 */
		const connection: Connection = await createConnection();
		if (connection.isConnected) {
			this.app.models = {};
			await require('./core/databases')(this.app, connection);
		}
		require("./core/managers")(this.app);

		createServer(this.app).listen(env("APP_PORT"), () => {
			console.log(`server started at http://localhost:${env("APP_PORT")}`);
		});
		return true;
	}
	getApp() {
		return this.app;
	}
}
const application = new App();
export default application.getApp();
