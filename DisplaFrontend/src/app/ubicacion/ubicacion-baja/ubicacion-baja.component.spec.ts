import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicacionBajaComponent } from './ubicacion-baja.component';

describe('UbicacionBajaComponent', () => {
  let component: UbicacionBajaComponent;
  let fixture: ComponentFixture<UbicacionBajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UbicacionBajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UbicacionBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
