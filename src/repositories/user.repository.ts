import { CreateUserDTO } from "../dtos/user.dtos";
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
    return User.findAll( { attributes: ["id", "name", "email", "createdAt", "updatedAt"] } );
  }

  public async findById(id: number) {
    return User.findOne({ where: { id: id }, attributes: ["id", "name", "email", "createdAt", "updatedAt"] });
  }
}

export default new UserRepository();
