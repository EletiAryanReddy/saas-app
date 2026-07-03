import { Request, Response, NextFunction }
from "express";

export const isAdmin =
(
req: Request,
res: Response,
next: NextFunction
) => {

const role =
req.headers.role;

if (role !== "ADMIN") {

return res.status(403).json({
success:false,
message:"Admin Only"
});

}

next();

};