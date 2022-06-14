import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaLComponent } from './vista-l.component';

describe('VistaLComponent', () => {
  let component: VistaLComponent;
  let fixture: ComponentFixture<VistaLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaLComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
