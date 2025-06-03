import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { AppError } from "../helpers/AppError";

async function authentication(request: Request, response: Response, next: NextFunction) {
    try {
        const authHeader = request.headers.authorization;

        if (!authHeader) throw new AppError("Token não informado", 401);

        const [, token] = authHeader.split(" ");

        const decoded = await jwt.verify(token, process.env.APP_SECRET);
        request["auth"] = decoded;
        next();
    } catch (error) {
        throw new AppError(error.message)
    }
}

export { authentication }