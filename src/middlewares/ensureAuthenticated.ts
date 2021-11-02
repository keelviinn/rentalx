import { Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  iat: number;
  exp: number;
  sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: Function) {
  if (!request.headers.authorization) throw new Error("Token not provided");
  
  const [, token] = request.headers.authorization.split(" ");

  try {
    const { sub: user_id } = verify(token, process.env.APP_SECRET) as IPayload;

    const usersRepository = new UsersRepository();

    if (! await usersRepository.findById(user_id)) throw new Error("User not found");

    next();
  } catch (error) {
    throw new Error("Invalid token");
  }
}