import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishReceiptComponent } from './finish-receipt.component';

describe('FinishReceiptComponent', () => {
  let component: FinishReceiptComponent;
  let fixture: ComponentFixture<FinishReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishReceiptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
