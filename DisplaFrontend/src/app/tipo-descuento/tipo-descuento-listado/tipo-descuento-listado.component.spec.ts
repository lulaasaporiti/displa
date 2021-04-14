import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDescuentoListadoComponent } from './tipo-descuento-listado.component';

describe('TipoDescuentoListadoComponent', () => {
  let component: TipoDescuentoListadoComponent;
  let fixture: ComponentFixture<TipoDescuentoListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoDescuentoListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoDescuentoListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
