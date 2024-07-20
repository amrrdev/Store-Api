import { promisify } from "node:util";

import jwt from "jsonwebtoken";

export const generateJwtToken = (payload) => {
    return jwt.sign(payload, process.env.SERCRET_JWT_KEY, {
        expiresIn: "30d",
    });
};

export const verifyJwtToken = async (token) => {
    return await promisify(jwt.verify)(token, process.env.SERCRET_JWT_KEY);
};
