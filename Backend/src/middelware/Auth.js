import jwt from 'jsonwebtoken';

const AuthMiddleware = async (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided', success: false });
    }

    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7, authHeader.length).trimLeft() : authHeader;

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        
        // Check if the decoded token has the required fields
        if (!decodedToken || !decodedToken._id) {
            console.error('Decoded token is invalid:', decodedToken);
            return res.status(401).json({ message: 'Invalid token payload', success: false });
        }
        
        req.user = decodedToken; // Ensure the whole decoded token is set
        console.log('Decoded Token:', decodedToken); // Debugging line

        next();
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(403).json({ message: 'Invalid token', success: false });
    }
};

export default AuthMiddleware;
