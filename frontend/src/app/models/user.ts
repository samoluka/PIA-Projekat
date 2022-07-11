import { Product } from './product';
import { Table } from './table';
import { Warehouse } from './warehouse';

export class User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  phone: string;
  email: string;
  name: string;
  pib: string;
  matBroj: string;
  type: string;
  status: string;
  photo: string;
  additionInfo: {
    category: string;
    code: string;
    pdv: boolean;
    warehouses: [Warehouse];
  };
  products: Product[];
  partners: User[];
  rooms: [
    {
      name: string;
      tables: [Table];
    }
  ];
}
