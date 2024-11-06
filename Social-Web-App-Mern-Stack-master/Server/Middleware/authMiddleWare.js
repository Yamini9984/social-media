import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_KEY;

const authMiddleWare = async (req, res, next) => {
    try {
        // Check if the authorization header is present
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(403).json({ message: "Authorization token is required." });
        }

        const token = authHeader.split(" ")[1];
        console.log("Token received:", token);

        if (token) {
            // Verify the token
            const decoded = jwt.verify(token, secret);
            console.log("Decoded token:", decoded);

            // Attach the user ID to the request object
            req.body._id = decoded.id; // Assuming decoded.id holds the user ID
            next(); // Call next middleware
        } else {
            return res.status(403).json({ message: "No token provided." });
        }
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({ message: "Unauthorized access." });
    }
};

export default authMiddleWare;
