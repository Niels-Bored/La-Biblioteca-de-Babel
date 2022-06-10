import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HaceradminComponent } from './haceradmin.component';

describe('HaceradminComponent', () => {
  let component: HaceradminComponent;
  let fixture: ComponentFixture<HaceradminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HaceradminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HaceradminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
