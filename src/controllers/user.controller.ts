import { Request, Response } from "express";
import UserService from "../services/user.service";
import { CreateUserDTO } from "../dtos/user.dtos";
import { getUserIdFromToken } from "../middlewares/getUserIdByToken";

class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password, confirmPassword } = req.body;

      if (password !== confirmPassword) {
        return res.status(401).json({ message: "Passwords don't match" });
      }

      const user: CreateUserDTO = { name, email, password };

      await UserService.create(user);

      return res.status(201).json({ message: "User created" });
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }

  public async authenticate(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      const user = await UserService.authenticate(email, password);

      return res
        .status(200)
        .json({ message: "Authenticated with succesfully", user });
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  }

  public async getLoggedUser(req: Request, res: Response) {
    try {
      const token = req.headers["authorization"] as string;

      const userId = (await getUserIdFromToken(token)) as number;

      const user = await UserService.findLoggedUser(userId);

      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  }

  public async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const users = await UserService.findAll();

      return res.status(200).json(users);
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      const user = await UserService.findById(parseInt(id));

      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  }
}

export default new UserController();
