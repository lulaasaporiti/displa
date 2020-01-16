import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientoBlockListadoComponent } from './movimiento-block-listado.component';

describe('MovimientoBlockListadoComponent', () => {
  let component: MovimientoBlockListadoComponent;
  let fixture: ComponentFixture<MovimientoBlockListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovimientoBlockListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientoBlockListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
