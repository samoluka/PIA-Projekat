import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ReceiptProductInfo } from 'src/app/models/receiptProductInfo';
import { User } from 'src/app/models/user';
import { CommonService } from 'src/app/services/commonService.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-receipt-page',
  templateUrl: './receipt-page.component.html',
  styleUrls: ['./receipt-page.component.css'],
})
export class ReceiptPageComponent implements OnInit {
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

  user: User;
  productsAdded: ReceiptProductInfo[];

  filter: string;

  price: number;
  quantity: Map<string, number> = new Map();
  allProducts: Product[];
  forDisplay: Product[];

  state: string;

  ngOnInit(): void {
    this.state = 'create';
    this.user = JSON.parse(localStorage.getItem('user'));
    this.productsAdded = [];
    this.forDisplay = [];
    this.userService
      .findCompanyWithProducts(this.user, -1, -1)
      .subscribe((user: User) => {
        this.allProducts = user.products;
        this.forDisplay = user.products;
        console.log(this.forDisplay);
      });
  }
  addToReceipt(product: Product) {
    this.productsAdded.push({
      price: this.price,
      pdv: product.taxRate,
      quantity: this.quantity[product._id],
      product: product._id,
      name: product.name,
      unit: product.unit,
      taxRate: product.taxRate,
    });
    console.log(this.productsAdded);
  }
  filterItems(event) {
    this.filter = event.target.value;
    if (this.filter.length > 0) {
      this.forDisplay = this.allProducts.filter((p) =>
        p.name.includes(this.filter)
      );
    } else {
      this.forDisplay = this.allProducts;
    }
  }
}
