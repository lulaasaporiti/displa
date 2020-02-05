import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoServicioListadoComponent } from './tipo-servicio-listado.component';

describe('TipoServicioListadoComponent', () => {
  let component: TipoServicioListadoComponent;
  let fixture: ComponentFixture<TipoServicioListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoServicioListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoServicioListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
