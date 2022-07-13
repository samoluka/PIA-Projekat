import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptTablePageComponent } from './receipt-table-page.component';

describe('ReceiptTablePageComponent', () => {
  let component: ReceiptTablePageComponent;
  let fixture: ComponentFixture<ReceiptTablePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiptTablePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiptTablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
