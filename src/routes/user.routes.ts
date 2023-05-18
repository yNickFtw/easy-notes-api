import { Router } from "express";
import UserController from "../controllers/user.controller";
import { checkIfIsAuthenticated } from "../middlewares/authenticateMiddleware";

const router = Router();

router.post("/register", UserController.create);
router.post("/authenticate", UserController.authenticate);
router.get("/", checkIfIsAuthenticated, UserController.findAll);
router.get("/profile", checkIfIsAuthenticated, UserController.getLoggedUser);
router.get("/:id", checkIfIsAuthenticated, UserController.findById);

export default router;
