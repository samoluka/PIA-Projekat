import { ReceiptProductInfo } from './receiptProductInfo';

export class Receipt {
  productsInfo: ReceiptProductInfo[];
  paymentInfo: {
    paymentType: string;
    firstName: string;
    lastName: string;
    slip: string;
    idCard: string;
    company: string;
  };
  date: Date;
  company: string;
}
