import CategoryRepository from "@/api/repositories/categories/CategoryRepository";
import ColorRepository from "@/api/repositories/colors/ColorRepository";
import SizeRepository from "@/api/repositories/sizes/SizeRepository";
import ClientRepository from "@/api/repositories/clients/ClientRepository";

const repositories = {
    color: ColorRepository,
    size: SizeRepository,
    category: CategoryRepository,
    client: ClientRepository
};

export const RepositoryFactory = {
    get: (name) => repositories[name],
};
