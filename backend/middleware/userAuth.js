import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const userAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: 'Not authorised' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(401).json({success:false, message:error.message });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();
};