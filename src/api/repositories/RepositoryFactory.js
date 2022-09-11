import CategoryRepository from "@/api/repositories/categories/CategoryRepository";

const repositories = {
    category: CategoryRepository
};

export const RepositoryFactory = {
    get: (name) => repositories[name],
};
