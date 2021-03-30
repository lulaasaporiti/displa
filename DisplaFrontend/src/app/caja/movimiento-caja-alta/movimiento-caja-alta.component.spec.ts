import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientoCajaAltaComponent } from './movimiento-caja-alta.component';

describe('MovimientoCajaAltaComponent', () => {
  let component: MovimientoCajaAltaComponent;
  let fixture: ComponentFixture<MovimientoCajaAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovimientoCajaAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientoCajaAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
