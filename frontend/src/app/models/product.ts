import { Category } from './category';
import { ObjectInfo } from './objectInfo';
import { User } from './user';
import { WarehouseInfo } from './warehouseInfo';

export class Product {
  _id: string;
  code: string;
  name: string;
  taxRate: number;
  company: User;
  unit: string;
  photo: string;
  category: Category;
  warehouseInfo: WarehouseInfo[];
  objectInfo: ObjectInfo[];
  productType: string;
  additionalData: {
    origin: string;
    originalName: string;
    barcode: string;
    producer: string;
    customFee: number;
    ecoTax: boolean;
    excise: boolean;
    minStock: number;
    maxStock: number;
    about: string;
    declaration: string;
  };
}
