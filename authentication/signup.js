import * as jwtAuthentication from "./jwt-utils.js";
import cathcAsync from "./../utils/catchAsync.js";
import User from "./../models/user-model.js";

export default cathcAsync(async (req, res, next) => {
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        role: req.body.role || "customer",
    });
    const token = jwtAuthentication.generateJwtToken({ id: user._id });
    res.status(201).json({
        status: "success",
        token,
        data: {
            user,
        },
    });
});
