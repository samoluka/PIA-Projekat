import { Component, OnInit } from '@angular/core';
import { Receipt } from 'src/app/models/receipt';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.css'],
})
export class CustomerPageComponent implements OnInit {
  constructor(private service: UserService) {}

  receipts: Receipt[];
  user: User;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.service
      .getMyReceipts(this.user.pib)
      .subscribe(
        (rec) =>
          (this.receipts = rec.filter(
            (r) => r.paymentInfo.idCard == this.user.pib
          ))
      );
  }
}
