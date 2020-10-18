import rateLimit from "express-rate-limit";

export const errorHandler = function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send({ statusCode: 500, message: err.message });
}

export const requestLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000
});