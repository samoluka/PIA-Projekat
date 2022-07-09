import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductToCategotyPageComponent } from './add-product-to-categoty-page.component';

describe('AddProductToCategotyPageComponent', () => {
  let component: AddProductToCategotyPageComponent;
  let fixture: ComponentFixture<AddProductToCategotyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductToCategotyPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductToCategotyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
