import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    if (await this.categoriesRepository.findByName(name)) throw new AppError("Category already exists!");     
  
    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };