import { CreateUserDTO } from "../dtos/user.dtos";
import { Note } from "../models/note.model";
import { User } from "../models/user.model";

// interfaces - DTOS

class UserRepository {
  public async create(user: any) {
    return await User.create(user);
  }

  public async checkIfUserExists(email: string) {
    return User.findOne({ where: { email } });
  }

  public async findAll() {
    return User.findAll({
      attributes: ["id", "name", "email", "createdAt", "updatedAt"],
    });
  }

  public async findById(id: number): Promise<any> {
    const user: any = await User.findByPk(id, {
      attributes: ["id", "name", "email", "createdAt", "updatedAt"]
    })

    if(!user) {
      throw new Error("User not found!")
    }

    const notes = await Note.findAll({
      where: { userId: user.id, isPublic: true },
    })

    return {
      ...user.toJSON(),
      notes: notes.map((note) => note.toJSON()),
    }
  }

  public async findLoggedUser(id: number) {
    const user: any = await User.findByPk(id, {
      attributes: ["id", "name", "email", "createdAt", "updatedAt"],
    });
  
    if (!user) {
      throw new Error("User not found!")
    }
  
    const notes = await Note.findAll({
      where: { userId: user.id },
      attributes: ["id", "title", "description"],
    });
  
    return {
      ...user.toJSON(),
      notes: notes.map((note) => note.toJSON()),
    };
  }
  
  
}

export default new UserRepository();
