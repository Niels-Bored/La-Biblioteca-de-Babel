import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroQRComponent } from './libro-qr.component';

describe('LibroQRComponent', () => {
  let component: LibroQRComponent;
  let fixture: ComponentFixture<LibroQRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibroQRComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibroQRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
