import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientoInternoBancoAltaComponent } from './movimiento-interno-banco-alta.component';

describe('MovimientoInternoBancoAltaComponent', () => {
  let component: MovimientoInternoBancoAltaComponent;
  let fixture: ComponentFixture<MovimientoInternoBancoAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovimientoInternoBancoAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientoInternoBancoAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
