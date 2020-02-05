import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoServicioBajaComponent } from './tipo-servicio-baja.component';

describe('TipoServicioBajaComponent', () => {
  let component: TipoServicioBajaComponent;
  let fixture: ComponentFixture<TipoServicioBajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoServicioBajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoServicioBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
