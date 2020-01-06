import { Request, Response } from "express";
import { Hash } from "../core/libs";
import UserService from "../services/user.service";
import { User } from "../interfaces";
import { HttpService, HTTP_CONFIG } from "../core/services";
export class UserMiddleware {
    public static async isLogged(req: Request, res: Response, next: () => void) {
        const { headers } = req;
        if (req.headers.authorization) {
            const userDecoded: any = Hash.decodeToken(headers.authorization.replace('Bearer ', ''));
            if (userDecoded && userDecoded.userId) {
                const userService: UserService = new UserService();
                const user: User = await userService.fnCheckValidUser(userDecoded);
                if (user) {
                    req.user = user;
                    return next();
                }
            }
        }
        return res.status(HTTP_CONFIG.Unauthorized.code)
            .send(
                HttpService.responseFailed({
                    message: HTTP_CONFIG.Unauthorized.name
                },
                    HTTP_CONFIG.Unauthorized.code
                )
            );
    }
}
