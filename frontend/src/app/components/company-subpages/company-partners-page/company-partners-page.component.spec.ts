import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyPartnersPageComponent } from './company-partners-page.component';

describe('CompanyPartnersPageComponent', () => {
  let component: CompanyPartnersPageComponent;
  let fixture: ComponentFixture<CompanyPartnersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyPartnersPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyPartnersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
