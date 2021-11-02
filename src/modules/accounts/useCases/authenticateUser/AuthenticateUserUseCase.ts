import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../repositories/IUserRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor (
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new Error("Email or password incorrect!");
    if (!await compare(password, user.password)) throw new Error("Email or password incorrect!");

    const token = sign({}, "secret", { subject: user.id, expiresIn: "1d"});

    const tokenData = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };

    return tokenData;
  }
}

export { AuthenticateUserUseCase };