import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicacionListadoComponent } from './ubicacion-listado.component';

describe('UbicacionListadoComponent', () => {
  let component: UbicacionListadoComponent;
  let fixture: ComponentFixture<UbicacionListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UbicacionListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UbicacionListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
