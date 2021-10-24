import { Router } from 'express';

import { createCategoryController } from '../module/cars/useCases/createCategory';
import { listCategoriesController } from '../module/cars/useCases/listCategories';

const categoriesRoutes = Router();

categoriesRoutes.post("/", (request, response) => createCategoryController.handle(request, response));
categoriesRoutes.get("/", (request, response) => listCategoriesController.handle(request, response));

export { categoriesRoutes };