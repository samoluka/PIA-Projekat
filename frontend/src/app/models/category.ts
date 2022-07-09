import { User } from './user';
import { Product } from './product';
export class Category {
  _id: string;
  name: string;
  company: User;
  supercategory: Category;
  subcategories: [Category];
  products: [Product];
}
