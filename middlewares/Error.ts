import {type NextFunction, type Request, type Response} from 'express';

export default class ErrorMiddleware {
    static handle (err: Error, req: Request, res: Response, next: NextFunction) {
        if (req.originalUrl.startsWith("/api")) {
            res.status(500).json({
                error: "Internal Server Error",
                message: err.message,
                stack: process.env.NODE_ENV === "development" ? err.stack : null,
            });
            return;
        }

        res.status(500).render("error", {
            pageTitle: "Error",
            message: "Internal Server Error",
            error: err.message,
        })
    }
}