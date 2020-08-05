import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizacionPrecioArticuloComponent } from './actualizacion-precio-articulo.component';

describe('ActualizacionPrecioArticuloComponent', () => {
  let component: ActualizacionPrecioArticuloComponent;
  let fixture: ComponentFixture<ActualizacionPrecioArticuloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizacionPrecioArticuloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizacionPrecioArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
