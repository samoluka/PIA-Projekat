import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { CommonService } from 'src/app/services/commonService.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
})
export class NewProductComponent implements OnInit {
  constructor(
    private commonService: CommonService,
    private productService: ProductService
  ) {
    this.subscriptionName = this.commonService
      .getUpdate()
      .subscribe((message) => {
        if (message != 'logout') this.ngOnInit();
      });
  }
  ngOnDestroy() {
    this.subscriptionName.unsubscribe();
  }

  messageReceived: any;
  private subscriptionName: Subscription;

  panelOpenState = false;
  code: string;
  name: string;
  taxRate: number = 0;
  company: User;
  unit: string;
  photo: File;
  error: string = '';
  origin: string;
  originalName: string;
  barcode: string;
  producer: string;
  customFee: number;
  ecoTax: boolean;
  excise: boolean;
  minStock: number;
  maxStock: number;
  about: string;
  declaration: string;

  ngOnInit(): void {
    this.company = JSON.parse(localStorage.getItem('user'));
  }

  change(event) {
    this.photo = (event.target as HTMLInputElement).files[0];
    console.log(this.photo);
  }

  saveProduct() {
    if (
      !this.code ||
      this.code.length == 0 ||
      !this.name ||
      this.name.length == 0 ||
      !this.unit ||
      this.unit.length == 0
    ) {
      return;
    }
    let product = new Product();
    product.code = this.code;
    product.name = this.name;
    product.company = this.company;
    product.taxRate = this.taxRate;
    product.unit = this.unit;
    product.additionalData = {
      ...(this.origin && {
        origin: this.origin,
      }),
      ...(this.originalName && {
        originalName: this.originalName,
      }),
      ...(this.barcode && {
        barcode: this.barcode,
      }),
      ...(this.producer && {
        producer: this.producer,
      }),
      ...(this.customFee && {
        customFee: this.customFee,
      }),
      ...(this.ecoTax && {
        ecoTax: this.ecoTax,
      }),
      ...(this.excise && {
        excise: this.excise,
      }),
      ...(this.minStock && {
        minStock: this.minStock,
      }),
      ...(this.maxStock && {
        maxStock: this.maxStock,
      }),
      ...(this.about && {
        about: this.about,
      }),
      ...(this.declaration && {
        declaration: this.declaration,
      }),
    };
    //this.addSimilar(product);
    this.productService.addProduct(product, this.photo).subscribe({
      next: (v) => {
        console.log(v);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
  private addSimilar(product: Product) {
    let i = 0;
    while (i < 5) {
      let newP = Object.assign({}, product);
      console.log(newP);
      newP.name = newP.name + i;
      newP.code = newP.code + i;
      i++;
      this.productService.addProduct(newP, null).subscribe({
        next: (v) => {
          console.log(v);
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }
}

