import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ReceiptProductInfo } from 'src/app/models/receiptProductInfo';
import { Table } from 'src/app/models/table';
import { User } from 'src/app/models/user';
import { CommonService } from 'src/app/services/commonService.service';
import { UserService } from 'src/app/services/user/user.service';

interface Room {
  name: string;
  tables: Table[];
}

@Component({
  selector: 'app-receipt-table-page',
  templateUrl: './receipt-table-page.component.html',
  styleUrls: ['./receipt-table-page.component.css'],
})
export class ReceiptTablePageComponent implements OnInit {
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
  rooms: Room[];
  selectedTable: Table;
  selectedRoom: Room;
  receipts: Map<String, Map<String, ReceiptProductInfo[]>> = new Map();

  filter: string;

  price: number;
  quantity: Map<string, number> = new Map();
  allProducts: Product[];
  forDisplay: Product[];
  state: string;
  ngOnInit(): void {
    if (this.selectedTable && this.selectedRoom) {
      let roomReceipts = this.receipts.get(this.selectedRoom.name);
      roomReceipts.delete(this.selectedTable.name);
    }

    console.log(this.receipts);

    this.selectedTable = null;
    this.selectedRoom = null;

    this.user = JSON.parse(localStorage.getItem('user'));
    this.rooms = this.user.rooms;
    this.state = 'create';
    this.forDisplay = [];
    this.userService
      .findCompanyWithProducts(this.user, -1, -1)
      .subscribe((user: User) => {
        this.allProducts = user.products;
        this.forDisplay = user.products;
        console.log(this.forDisplay);
      });
  }

  selectTable(table, room) {
    if (this.selectedTable == table) {
      this.selectedTable = null;
      this.selectedRoom = null;
    } else {
      this.selectedTable = table;
      this.selectedRoom = room;
    }
  }
  getColor(table) {
    if (this.selectedTable == table) {
      return '#f3dbdb';
    } else {
      return '';
    }
  }
  addToReceipt(product: Product) {
    let table = this.selectedTable;
    let room = this.selectedRoom;
    let info = {
      price: this.price,
      pdv: product.taxRate,
      quantity: this.quantity[product._id],
      product: product._id,
      name: product.name,
      unit: product.unit,
      taxRate: product.taxRate,
    };
    let roomReceipts = this.receipts.get(room.name);
    if (roomReceipts == null) {
      roomReceipts = new Map<String, ReceiptProductInfo[]>();
    }
    let receiptInfo = roomReceipts.get(table.name);
    if (receiptInfo == null) {
      receiptInfo = [];
    }
    receiptInfo.push(info);
    roomReceipts.set(table.name, receiptInfo);
    this.receipts.set(room.name, roomReceipts);
    console.log(this.receipts);
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

  finishReceipt() {
    console.log(this.receipts);
    this.state = 'closing';
  }
}
