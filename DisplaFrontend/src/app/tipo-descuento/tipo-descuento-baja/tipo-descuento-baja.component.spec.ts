import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDescuentoBajaComponent } from './tipo-descuento-baja.component';

describe('TipoDescuentoBajaComponent', () => {
  let component: TipoDescuentoBajaComponent;
  let fixture: ComponentFixture<TipoDescuentoBajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoDescuentoBajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoDescuentoBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
