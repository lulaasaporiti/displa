import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificacionPrecioServicioComponent } from './modificacion-precio-servicio.component';

describe('ModificacionPrecioServicioComponent', () => {
  let component: ModificacionPrecioServicioComponent;
  let fixture: ComponentFixture<ModificacionPrecioServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificacionPrecioServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificacionPrecioServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
