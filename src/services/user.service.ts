import { CreateUserDTO } from "../dtos/user.dtos";
import jwt from "jsonwebtoken";
import UserRepository from "../repositories/user.repository";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

class UserService {
  public async create(user: CreateUserDTO): Promise<void> {
    try {
      const { name, email, password } = user;

      if (!name || !email || !password) {
        throw new Error("Missing data!");
      }

      const checkIfUserExists = await UserRepository.checkIfUserExists(email);

      if (checkIfUserExists) {
        throw new Error("User already exists!");
      }

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(password, salt);

      const newUser: CreateUserDTO = {
        name: name,
        email: email,
        password: encryptedPassword,
      };

      await UserRepository.create(newUser);

      return;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async authenticate(email: string, password: string): Promise<any> {
    try {
      if (!email || !password) {
        throw new Error("Missing data!");
      }

      const user: any = await UserRepository.checkIfUserExists(email);

      if (!user) throw new Error("User not found!");

      if (!user.password) throw new Error("Password of user is not defined");

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) throw new Error("Invalid password!");

      const response = await this.generateToken(user.id);

      return { response };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async findAll(id: number): Promise<any> {
    try {
      const users = await UserRepository.findAll(id);

      if (!users) {
        throw new Error("Users not found!");
      }

      return users;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async searchUser(q: string): Promise<any> {
    try {
      const users = await UserRepository.searchUser(q)

      if(!users) throw new Error("Users not found")

      return users
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  public async findLoggedUser(id: number): Promise<any> {
    try {
      const user = await UserRepository.findLoggedUser(id)

      if(!user) {
        throw new Error("User not found!")
      }

      return user
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  public async findById(id: number): Promise<any> {
    try {
      const user = await UserRepository.findById(id);

      if (!user) {
        throw new Error("User not found!");
      }

      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  private async generateToken(id: number) {
    const user = await UserRepository.findById(id);

    if (!user) {
      throw new Error("Usuário não encontrado!");
    }

    const token = jwt.sign({ id }, JWT_SECRET, {
      expiresIn: "365d",
    });

    return { token, id };
  }
}

export default new UserService();
