import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoServicioModificacionComponent } from './tipo-servicio-modificacion.component';

describe('TipoServicioModificacionComponent', () => {
  let component: TipoServicioModificacionComponent;
  let fixture: ComponentFixture<TipoServicioModificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoServicioModificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoServicioModificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
