import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionPrecioClienteServicioComponent } from './asignacion-precio-servicio.component';

describe('AsignacionPrecioClienteServicioComponent', () => {
  let component: AsignacionPrecioClienteServicioComponent;
  let fixture: ComponentFixture<AsignacionPrecioClienteServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignacionPrecioClienteServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignacionPrecioClienteServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
