import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PrecioServicioListadoDetalleComponent } from './precio-servicio-listado-detalle.component';


describe('PrecioServicioListadoDetalleComponent', () => {
  let component: PrecioServicioListadoDetalleComponent;
  let fixture: ComponentFixture<PrecioServicioListadoDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrecioServicioListadoDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecioServicioListadoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
