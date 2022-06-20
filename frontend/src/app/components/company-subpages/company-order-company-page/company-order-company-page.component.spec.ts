import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyOrderCompanyPageComponent } from './company-order-company-page.component';

describe('CompanyOrderCompanyPageComponent', () => {
  let component: CompanyOrderCompanyPageComponent;
  let fixture: ComponentFixture<CompanyOrderCompanyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyOrderCompanyPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyOrderCompanyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
