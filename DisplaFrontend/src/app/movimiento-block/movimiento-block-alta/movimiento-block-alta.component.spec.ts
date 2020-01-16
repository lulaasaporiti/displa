import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientoBlockAltaComponent } from './movimiento-block-alta.component';

describe('MovimientoBlockAltaComponent', () => {
  let component: MovimientoBlockAltaComponent;
  let fixture: ComponentFixture<MovimientoBlockAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovimientoBlockAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientoBlockAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
