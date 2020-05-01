import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalidadBajaComponent } from './localidad-baja.component';

describe('LocalidadBajaComponent', () => {
  let component: LocalidadBajaComponent;
  let fixture: ComponentFixture<LocalidadBajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalidadBajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalidadBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
