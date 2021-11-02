
import { AppError } from "../../../../errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

describe("Create category", () => {

  let createCategoryUseCase: CreateCategoryUseCase;
  let categoryRepositoryInMemory: CategoriesRepositoryInMemory;

  beforeEach(() => {
    categoryRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoryRepositoryInMemory);
  });

  it("Should create a category", async () => {
    await createCategoryUseCase.execute({ name: "Category 1", description: "Description 1" });

    categoryRepositoryInMemory.findByName("Category 1").then(category => {
      expect(category).toHaveProperty("id");
      expect(category.name).toBe("Category 1");
      expect(category.description).toBe("Description 1");
    });
  });

  it("Should not create a category with the same name", async () => {
    expect(async () => {      
      await createCategoryUseCase.execute({ name: "Category 1", description: "Description 1" });
      await createCategoryUseCase.execute({ name: "Category 1", description: "Description 1" });
    })
      .rejects.toBeInstanceOf(AppError);
  });
});

