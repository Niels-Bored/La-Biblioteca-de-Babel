import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogincelComponent } from './logincel.component';

describe('LogincelComponent', () => {
  let component: LogincelComponent;
  let fixture: ComponentFixture<LogincelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogincelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogincelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
