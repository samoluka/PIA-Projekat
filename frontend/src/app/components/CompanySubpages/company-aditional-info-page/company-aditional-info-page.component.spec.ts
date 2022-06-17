import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAditionalInfoPageComponent } from './company-aditional-info-page.component';

describe('CompanyAditionalInfoPageComponent', () => {
  let component: CompanyAditionalInfoPageComponent;
  let fixture: ComponentFixture<CompanyAditionalInfoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyAditionalInfoPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyAditionalInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
