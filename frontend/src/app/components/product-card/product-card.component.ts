import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ObjectInfo } from 'src/app/models/objectInfo';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { WarehouseInfo } from 'src/app/models/warehouseInfo';
import { CommonService } from 'src/app/services/commonService.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  constructor(
    private commonService: CommonService,
    private productService: ProductService
  ) {}

  @Input() product!: Product;
  @Input() btns: boolean = true;

  deleteProduct() {
    this.productService.deleteProduct(this.product).subscribe({
      next: (v) => {
        this.commonService.sendUpdate('update');
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  update: boolean = false;

  company: User;

  ngOnInit(): void {
    this.company = JSON.parse(localStorage.getItem('user'));
  }
  updateProduct() {
    if (
      !this.product.code ||
      this.product.code.length == 0 ||
      !this.product.name ||
      this.product.name.length == 0 ||
      !this.product ||
      this.product.unit.length == 0
    ) {
      return;
    }
    let update = {
      code: this.product.code,
      name: this.product.name,
      unit: this.product.unit,
      productType: this.product.productType,
      additionalData: this.product.additionalData,
      warehouseInfo: this.product.warehouseInfo,
      objectInfo: this.product.objectInfo,
      taxRate: this.product.taxRate,
    };
    this.productService.updateProduct(this.product, update).subscribe((p) => {
      this.commonService.sendUpdate('update');
    });
  }
}

@Component({
  selector: 'delete-dialog',
  templateUrl: 'delete-dialog.html',
})
export class DialogOverviewExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialog>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
