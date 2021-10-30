import fs from 'fs';
import csvParse from 'csv-parse';
import { inject, injectable } from 'tsyringe';

import { ICategoriesRepository, ICreateCategoryDTO } from '../../repositories/ICategoriesRepository';

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];
      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, description] = line;
          categories.push({ name, description });
        })
        .on("end", () => { 
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on("error", (err) => reject(err));
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);
    
    categories.forEach(async ({ name, description }: ICreateCategoryDTO) => {
      if (!await this.categoriesRepository.findByName(name)) {
        await this.categoriesRepository.create({ name: name, description });
      }
    })
  }
}

export { ImportCategoryUseCase }