import { Component, Input, OnInit } from '@angular/core';
import { Receipt } from 'src/app/models/receipt';
import { ReceiptProductInfo } from 'src/app/models/receiptProductInfo';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-receipt-view',
  templateUrl: './receipt-view.component.html',
  styleUrls: ['./receipt-view.component.css'],
})
export class ReceiptViewComponent implements OnInit {
  constructor(private userService: UserService) {}

  @Input() receipt: Receipt;
  @Input() receiptInfo: ReceiptProductInfo[];

  user: User;
  company: User;

  sumNo = 0;
  sumYes = 0;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.receipt) {
      this.userService
        .findUserById(this.receipt.company)
        .subscribe((user: User) => (this.company = user));
      this.receipt.productsInfo.forEach((p) => {
        this.sumNo += p.price * p.quantity;
        this.sumYes += p.price * p.quantity * (1 + p.taxRate / 100.0);
      });
    } else {
      this.receiptInfo.forEach((p) => {
        this.sumNo += p.price * p.quantity;
        this.sumYes += p.price * p.quantity * (1 + p.taxRate / 100.0);
      });
    }
  }
}
