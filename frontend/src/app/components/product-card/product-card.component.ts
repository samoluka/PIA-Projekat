import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CommonService } from 'src/app/services/commonService.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private commonService: CommonService
  ) {}

  @Input() product!: Product;

  ngOnInit(): void {}

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
}
