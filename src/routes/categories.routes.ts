import { Router } from 'express';
import multer from 'multer';

import { createCategoryController } from '../module/cars/useCases/createCategory';
import { importCategoryController } from '../module/cars/useCases/importCategory';
import { listCategoriesController } from '../module/cars/useCases/listCategories';

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp"
})

categoriesRoutes.post("/", (request, response) => createCategoryController.handle(request, response));
categoriesRoutes.get("/", (request, response) => listCategoriesController.handle(request, response));

categoriesRoutes.post("/import", upload.single("file"), (request, response) => importCategoryController.handle(request, response));

export { categoriesRoutes };