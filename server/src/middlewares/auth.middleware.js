import jwt from "jsonwebtoken";
import env from "../config/env.js";

export const isAuth = (req, res, next) => {
    try {
        const accessToken = req.cookies?.accesstoken;
        // console.log(accessToken);
        
        if (!accessToken) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }

        const decoded = jwt.verify(
            accessToken,
            env.ACCESSTOKEN
        );

        req.userId = decoded.id;

        next();
    } catch (err) {
        console.log("JWT Error:", err.message);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};