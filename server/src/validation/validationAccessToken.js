import jwt from "jsonwebtoken";

export const verifyAccessToken = (req, res, next) => {
    try {
        const authHeader = req.cookies?.accesstoken;
        // console.log(authHeader);

        if (!authHeader ) {
            return res.status(401).json({
                message: "Access token not found",
            });
        }
        
        const accessToken = authHeader//.split(" ")[1];

        const decoded = jwt.verify(
            accessToken,
            process.env.ACCESSTOKEN
        );

        req.user = {
            id: decoded.id,
        };

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired access token",
        });
    }
};