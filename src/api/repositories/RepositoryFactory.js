import CategoryRepository from "@/api/repositories/categories/CategoryRepository";
import ColorRepository from "@/api/repositories/colors/ColorRepository";
import SizeRepository from "@/api/repositories/sizes/SizeRepository";
import ClientRepository from "@/api/repositories/clients/ClientRepository";
import VoucherRepository from "@/api/repositories/vouchers/VoucherRepository";
import AccountRepository from "@/api/repositories/accounts/AccountRepository";
import AuthRepository from "@/api/repositories/authentications/AuthRepository";

const repositories = {
    color: ColorRepository,
    size: SizeRepository,
    category: CategoryRepository,
    client: ClientRepository,
    voucher: VoucherRepository,
    account: AccountRepository,
    auth: AuthRepository
};

export const RepositoryFactory = {
    get: (name) => repositories[name],
};
