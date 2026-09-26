import {type NextFunction, type Request, type Response} from 'express';

export default class NotFoundMiddleware {
    static handle (req: Request, res: Response, next: NextFunction) {
        if (req.originalUrl.startsWith("/api")) {
            res.status(404).json({
                error: "This Page Not Found",
                message: `${req.originalUrl} this is wrong route ..`
            });
            return;
        }

        res.status(404).render("notFound", {
            pageTitle: "Error",
            message: `${req.originalUrl} this is wrong route ..`,
        });
        next();
    }
}