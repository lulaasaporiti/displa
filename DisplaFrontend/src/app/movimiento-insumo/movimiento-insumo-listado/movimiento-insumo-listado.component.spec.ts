import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientoInsumoListadoComponent } from './movimiento-insumo-listado.component';

describe('MovimientoInsumoListadoComponent', () => {
  let component: MovimientoInsumoListadoComponent;
  let fixture: ComponentFixture<MovimientoInsumoListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovimientoInsumoListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientoInsumoListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
