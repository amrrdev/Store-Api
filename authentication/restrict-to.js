import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

export default (...roles) => {
    return catchAsync(async (req, res, next) => {
        console.log(req.user);
        if (!roles.includes(req.user.role))
            return next(new AppError("You do not have permission to perform this action", 403));
        next();
    });
};
