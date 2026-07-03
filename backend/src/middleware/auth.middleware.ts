// auth.middleware.ts
import jwt from "jsonwebtoken";

export const authMiddleware = (req: any, res: any, next: any) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).send("Unauthorized");

  const decoded = jwt.verify(token, process.env.JWT_SECRET!);

  req.user = decoded;
  next();
};