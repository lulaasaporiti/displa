import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecioLenteListadoDetalleComponent } from './precio-lente-listado-detalle.component';

describe('PrecioLenteListadoDetalleComponent', () => {
  let component: PrecioLenteListadoDetalleComponent;
  let fixture: ComponentFixture<PrecioLenteListadoDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrecioLenteListadoDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecioLenteListadoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
