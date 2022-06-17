import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotApprovedPageComponent } from './not-approved-page.component';

describe('NotApprovedPageComponent', () => {
  let component: NotApprovedPageComponent;
  let fixture: ComponentFixture<NotApprovedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotApprovedPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotApprovedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
