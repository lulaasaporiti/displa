import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientoInternoDetalleComponent } from './movimiento-interno-detalle.component';

describe('MovimientoInternoDetalleComponent', () => {
  let component: MovimientoInternoDetalleComponent;
  let fixture: ComponentFixture<MovimientoInternoDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovimientoInternoDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientoInternoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
