import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizacionPrecioServicioComponent } from './actualizacion-precio-servicio.component';

describe('ActualizacionPrecioServicioComponent', () => {
  let component: ActualizacionPrecioServicioComponent;
  let fixture: ComponentFixture<ActualizacionPrecioServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizacionPrecioServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizacionPrecioServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
