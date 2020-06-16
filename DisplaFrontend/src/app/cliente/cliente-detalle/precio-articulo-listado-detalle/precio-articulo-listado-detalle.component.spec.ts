import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PrecioArticuloListadoDetalleComponent } from './precio-articulo-listado-detalle.component';

describe('PrecioArticuloListadoDetalleComponent', () => {
  let component: PrecioArticuloListadoDetalleComponent;
  let fixture: ComponentFixture<PrecioArticuloListadoDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrecioArticuloListadoDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecioArticuloListadoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
