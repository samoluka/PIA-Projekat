import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
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
    private commonService: CommonService,
    public dialog: MatDialog
  ) {}

  @Input() product!: Product;

  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

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
