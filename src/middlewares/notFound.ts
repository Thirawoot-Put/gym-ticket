import { Request, Response } from "express";
import StatusCodes from "@/utils/statusCode";

const notFound = (req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({ error: "Resource not found" });
};

export default notFound;
