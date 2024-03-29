import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCustomerFormComponent } from './register-customer-form.component';

describe('RegisterCustomerFormComponent', () => {
  let component: RegisterCustomerFormComponent;
  let fixture: ComponentFixture<RegisterCustomerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterCustomerFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterCustomerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
