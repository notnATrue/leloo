import { req, res, next } from "express";

export const route = async function(req, res) {
    res.json({ message: 'ok', code: '200'});
}

// export default route;