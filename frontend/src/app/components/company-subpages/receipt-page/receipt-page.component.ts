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

  price: Map<String, number> = new Map();
  quantity: Map<string, number> = new Map();
  stocks: Map<string, number> = new Map();
  messages: Map<string, string> = new Map();
  allProducts: Product[];
  forDisplay: Product[];

  selectedObject: string;

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
        this.filter = '';
      });
  }
  addToReceipt(product: Product) {
    if (this.quantity[product._id] > this.stocks.get(product._id)) {
      this.messages = new Map();
      this.messages.set(product._id, 'ne postoji toliko porizvoda na stanju');
      return;
    }
    this.productsAdded.push({
      price: this.price.get(product._id),
      pdv: product.taxRate,
      quantity: this.quantity[product._id],
      product: product._id,
      name: product.name,
      unit: product.unit,
      taxRate: product.taxRate,
    });
    product.warehouseInfo.forEach((w) => {
      if (w.id.toString() == this.selectedObject) {
        w.stocks = w.stocks - this.quantity[product._id];
        this.stocks.set(product._id, w.stocks);
      }
    });
    product.objectInfo.forEach((w) => {
      if (w.location == this.selectedObject) {
        w.stocks = w.stocks - this.quantity[product._id];
        this.stocks.set(product._id, w.stocks);
      }
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
  change() {
    this.price = new Map();
    this.stocks = new Map();
    this.productsAdded = [];
    this.userService
      .findCompanyWithProducts(this.user, -1, -1)
      .subscribe((user: User) => {
        this.allProducts = user.products;
        this.forDisplay = user.products;
        console.log(this.forDisplay);
      });

    this.forDisplay.forEach((p) => {
      p.warehouseInfo.forEach((w) => {
        console.log(`${w.id.toString()}:${this.selectedObject}`);
        if (w.id.toString() == this.selectedObject) {
          this.price.set(p._id, w.sellPrice);
          this.stocks.set(p._id, w.stocks);
        }
      });
      p.objectInfo.forEach((w) => {
        console.log(`${w.location}:${this.selectedObject}`);
        if (w.location == this.selectedObject) {
          this.price.set(p._id, w.sellPrice);
          this.stocks.set(p._id, w.stocks);
        }
      });
    });
  }
}
