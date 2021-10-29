import { Request, response, Response } from "express";
import { ListCategoriesUseCase } from "./ListaSpecificationsUseCase";

class ListCategoriesController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

  handle(request: Request, response: Response): Response {
    const categories = this.listCategoriesUseCase.execute();

    return response.json(categories);
  }
}

export { ListCategoriesController };