import { Router } from 'express';
import { SpecificationsRepository } from '../module/cars/repositories/implementations/SpecificationsRepository';
import { CreateSpecificationService } from '../module/cars/services/CreateSpecificationService';
import { createSpecificationController } from '../module/cars/useCases/createSpecification';

const specificationsRoutes = Router();

specificationsRoutes.post("/", (request, response) => createSpecificationController.handle(request, response));

export { specificationsRoutes };