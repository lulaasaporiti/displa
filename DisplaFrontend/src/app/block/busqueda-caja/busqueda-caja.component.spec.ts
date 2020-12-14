import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaCajaComponent } from './busqueda-caja.component';

describe('BusquedaCajaComponent', () => {
  let component: BusquedaCajaComponent;
  let fixture: ComponentFixture<BusquedaCajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaCajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
