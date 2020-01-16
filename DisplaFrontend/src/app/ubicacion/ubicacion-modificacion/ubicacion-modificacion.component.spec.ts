import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicacionModificacionComponent } from './ubicacion-modificacion.component';

describe('UbicacionModificacionComponent', () => {
  let component: UbicacionModificacionComponent;
  let fixture: ComponentFixture<UbicacionModificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UbicacionModificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UbicacionModificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
