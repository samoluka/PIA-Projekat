import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAdditionalInfoPageComponent } from './company-additional-info-page.component';

describe('CompanyAdditionalInfoPageComponent', () => {
  let component: CompanyAdditionalInfoPageComponent;
  let fixture: ComponentFixture<CompanyAdditionalInfoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyAdditionalInfoPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyAdditionalInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
