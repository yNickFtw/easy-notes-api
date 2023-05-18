import { Router } from "express";
// routers
import userRoutes from "./user.routes";
import noteRoutes from "./note.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/notes", noteRoutes);

export { router };
