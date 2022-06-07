import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsercionLibrosComponent } from './insercion-libros.component';

describe('InsercionLibrosComponent', () => {
  let component: InsercionLibrosComponent;
  let fixture: ComponentFixture<InsercionLibrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsercionLibrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsercionLibrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
