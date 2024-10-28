import { jwt } from "jsonwebtoken";
import { APIerror } from "../utils/APIerror";
import { asynchandler } from "../utils/asynchandler";

const verifyAccessToken = asynchandler(async (req, res, next) => {
    try {
        const token =
            req.cookies?.accessToken ||
            req.header("accessToken")?.replace("Bearer ", "");
        // const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return next(new APIerror(401, "Unauthorized request"));
        }

        /*
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return next(new APIerror(403, "Token is not valid or expired"));
            }
    
            req.user = user;
            next();
        });
        */

        // Alternate Method
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken"
        );

        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});

export { verifyAccessToken };
