import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientoCajaDiariaAltaComponent } from './movimiento-caja-diaria-alta.component';

describe('MovimientoCajaDiariaAltaComponent', () => {
  let component: MovimientoCajaDiariaAltaComponent;
  let fixture: ComponentFixture<MovimientoCajaDiariaAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovimientoCajaDiariaAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientoCajaDiariaAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
