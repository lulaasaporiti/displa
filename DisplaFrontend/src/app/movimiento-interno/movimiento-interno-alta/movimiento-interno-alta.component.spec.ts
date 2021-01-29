import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientoInternoAltaComponent } from './movimiento-interno-alta.component';

describe('MovimientoInternoComponent', () => {
  let component: MovimientoInternoAltaComponent;
  let fixture: ComponentFixture<MovimientoInternoAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovimientoInternoAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientoInternoAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
