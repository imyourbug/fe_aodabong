import CategoryRepository from "@/api/repositories/categories/CategoryRepository";
import ClientRepository from "@/api/repositories/clients/ClientRepository";

const repositories = {
    category: CategoryRepository,
    client: ClientRepository
};

export const RepositoryFactory = {
    get: (name) => repositories[name],
};
