import { User } from './user';

export class Product {
  code: string;
  name: string;
  taxRate: number;
  company: User;
  unit: string;
  photo: string;
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
