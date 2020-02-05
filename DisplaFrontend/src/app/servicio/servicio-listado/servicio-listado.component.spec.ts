import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioListadoComponent } from './servicio-listado.component';

describe('ServicioListadoComponent', () => {
  let component: ServicioListadoComponent;
  let fixture: ComponentFixture<ServicioListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicioListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicioListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
