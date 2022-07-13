import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Receipt } from 'src/app/models/receipt';
import { User } from 'src/app/models/user';
import { CommonService } from 'src/app/services/commonService.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.css'],
})
export class StatisticsPageComponent implements OnInit {
  constructor(
    private userService: UserService,
    private commonService: CommonService
  ) {
    this.subscriptionName = this.commonService.getUpdate().subscribe((m) => {
      this.ngOnInit();
    });
  }
  ngOnDestroy() {
    this.subscriptionName.unsubscribe();
  }

  messageReceived: any;
  private subscriptionName: Subscription;

  receipts: Receipt[];
  toDisplay: Receipt[];
  user: User;
  date: Date;
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userService.getReceipts(this.user).subscribe((receipts) => {
      this.receipts = receipts;
      this.toDisplay = receipts;
    });
  }

  sumN: number;
  sumY: number;
  message: string;
  showStatistics() {
    let onThisDate = this.receipts.filter((r) => {
      let y = Number.parseInt(r.date.toString().substring(0, 4));
      let m = Number.parseInt(r.date.toString().substring(5, 7));
      let d = Number.parseInt(r.date.toString().substring(8, 10));
      return (
        y === this.date.getFullYear() &&
        m === this.date.getMonth() + 1 &&
        d === this.date.getDate()
      );
    });
    this.toDisplay = onThisDate;
    this.sumY = 0;
    this.sumN = 0;
    onThisDate.forEach((r) => {
      r.productsInfo.forEach((p) => {
        this.sumN += p.price * p.quantity;
        if (this.user.additionInfo.pdv) {
          this.sumY += p.price * p.quantity * (1 + p.taxRate / 100.0);
        } else {
          this.sumY += p.price * p.quantity;
        }
      });
    });
    this.message = `ukupna vrednost racuna je: ${this.sumY}`;
    if (this.user.additionInfo.pdv) {
      this.message = `${this.message}, od cega je ${
        this.sumY - this.sumN
      } porez`;
    }
  }
}
