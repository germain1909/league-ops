import { Router, type Request, type Response } from "express";

const router = Router();

function getHealth(_req: Request, res: Response) {
  res.status(200).json({
    status: "ok",
    service: "league-ops-api",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
}

router.get("/", getHealth);

export default router;