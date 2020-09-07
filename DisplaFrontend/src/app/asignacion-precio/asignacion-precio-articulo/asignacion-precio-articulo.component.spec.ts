import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionPrecioClienteArticuloComponent } from './asignacion-precio-articulo.component';

describe('AsignacionPrecioClienteArticuloComponent', () => {
  let component: AsignacionPrecioClienteArticuloComponent;
  let fixture: ComponentFixture<AsignacionPrecioClienteArticuloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignacionPrecioClienteArticuloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignacionPrecioClienteArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
