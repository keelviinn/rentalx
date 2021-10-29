import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoriesUseCase } from "./ListaSpecificationsUseCase";
import { ListCategoriesController } from "./ListSpecificationsController";

const categoriesRepository = null;
const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);
const listCategoriesController = new ListCategoriesController(listCategoriesUseCase);

export { listCategoriesController };