import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Receipt } from 'src/app/models/receipt';
import { ReceiptProductInfo } from 'src/app/models/receiptProductInfo';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-finish-receipt',
  templateUrl: './finish-receipt.component.html',
  styleUrls: ['./finish-receipt.component.css'],
})
export class FinishReceiptComponent implements OnInit {
  constructor(private userService: UserService) {}

  firstName: string;
  lastName: string;
  idCard: string;
  slip: string;
  paymentType: string;
  payingCompany: User;
  user: User;

  cash: number = 0;

  sumNo: number = 0;
  sumYes: number = 0;

  @Input() productsAdded!: ReceiptProductInfo[];

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.productsAdded.forEach((p) => {
      this.sumNo += p.price * p.quantity;
      if (this.user.additionInfo.pdv) {
        this.sumYes += p.price * p.quantity * (1 + p.pdv / 100.0);
      } else {
        this.sumYes += p.price * p.quantity;
      }
    });
    this.userService.findUserWithPartners(this.user).subscribe((user: User) => {
      this.user = user;
    });
  }

  finishReceipt() {
    let receipt = new Receipt();
    receipt.productsInfo = this.productsAdded;
    receipt.paymentInfo = {
      paymentType: this.paymentType,
      ...(this.firstName && { firstName: this.firstName }),
      ...(this.lastName && { lastName: this.lastName }),
      ...(this.slip && { slip: this.slip }),
      ...(this.idCard && { idCard: this.idCard }),
      ...(this.payingCompany && { company: this.payingCompany._id }),
    };
    this.userService.addReceipt(this.user, receipt).subscribe((receipt) => {
      this.ngOnInit();
    });
  }
}
