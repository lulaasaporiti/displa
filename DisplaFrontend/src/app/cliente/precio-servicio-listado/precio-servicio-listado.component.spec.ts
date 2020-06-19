import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecioServicioListadoComponent } from './precio-servicio-listado.component';

describe('PrecioServicioListadoComponent', () => {
  let component: PrecioServicioListadoComponent;
  let fixture: ComponentFixture<PrecioServicioListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrecioServicioListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecioServicioListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
