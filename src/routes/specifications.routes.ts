import { Router } from 'express';
import { SpecificationsRepository } from '../module/cars/repositories/implementations/SpecificationsRepository';
import { CreateSpecificationService } from '../module/cars/services/CreateSpecificationService';

const specificationsRoutes = Router();
const specificationsRepository = new SpecificationsRepository();

specificationsRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  const createSpecificationService = new CreateSpecificationService(specificationsRepository);

  createSpecificationService.execute({ name, description });

  return response.status(201).send();
});

export { specificationsRoutes };