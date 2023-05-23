import CategoryRepository from "@/api/repositories/categories/CategoryRepository";
import SupplierRepository from "@/api/repositories/suppliers/SupplierRepository";
import ProductRepository from "@/api/repositories/products/ProductRepository";
import ColorRepository from "@/api/repositories/colors/ColorRepository";
import SizeRepository from "@/api/repositories/sizes/SizeRepository";
import ClientRepository from "@/api/repositories/clients/ClientRepository";
import VoucherRepository from "@/api/repositories/vouchers/VoucherRepository";
import AccountRepository from "@/api/repositories/accounts/AccountRepository";
import AuthRepository from "@/api/repositories/authentications/AuthRepository";
import UploadRepository from "@/api/repositories/uploads/UploadRepository";
import ProvinceRepository from "@/api/repositories/provinces/ProvinceRepository";
import CommentRepository from "@/api/repositories/comments/CommentRepository";
import SlideRepository from "@/api/repositories/sliders/SlideRepository";
import DetailProductRepository from "@/api/repositories/detail_products/DetailProductRepository";

const repositories = {
  color: ColorRepository,
  size: SizeRepository,
  category: CategoryRepository,
  supplier: SupplierRepository,
  product: ProductRepository,
  detail_product: DetailProductRepository,
  client: ClientRepository,
  voucher: VoucherRepository,
  account: AccountRepository,
  auth: AuthRepository,
  upload: UploadRepository,
  province: ProvinceRepository,
  comment: CommentRepository,
  slide: SlideRepository,
};

export const RepositoryFactory = {
  get: (name) => repositories[name],
};
