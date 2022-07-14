import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCompanyProductsComponent } from './all-company-products.component';

describe('AllCompanyProductsComponent', () => {
  let component: AllCompanyProductsComponent;
  let fixture: ComponentFixture<AllCompanyProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCompanyProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllCompanyProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
