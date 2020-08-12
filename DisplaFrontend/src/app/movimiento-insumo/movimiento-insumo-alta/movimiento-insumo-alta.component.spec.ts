import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientoInsumoAltaComponent } from './movimiento-insumo-alta.component';

describe('MovimientoInsumoAltaComponent', () => {
  let component: MovimientoInsumoAltaComponent;
  let fixture: ComponentFixture<MovimientoInsumoAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovimientoInsumoAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientoInsumoAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
