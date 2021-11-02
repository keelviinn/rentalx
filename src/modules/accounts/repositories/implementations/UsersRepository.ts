import { getRepository, Repository } from "typeorm";

import { User } from "../../entities/User";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../IUserRepository";


class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ id, name, email, password, driver_license, avatar }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({ id, name, email, password, driver_license, avatar });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.repository.findOne({ email });
  }

  async findById(id: string): Promise<User> {
    return await this.repository.findOne(id);
  }
}

export { UsersRepository };