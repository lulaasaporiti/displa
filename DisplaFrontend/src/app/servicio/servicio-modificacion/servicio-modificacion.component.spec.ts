import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioModificacionComponent } from './servicio-modificacion.component';

describe('ServicioModificacionComponent', () => {
  let component: ServicioModificacionComponent;
  let fixture: ComponentFixture<ServicioModificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicioModificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicioModificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
