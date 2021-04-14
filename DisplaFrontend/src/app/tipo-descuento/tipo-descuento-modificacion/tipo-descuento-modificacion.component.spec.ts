import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDescuentoModificacionComponent } from './tipo-descuento-modificacion.component';

describe('TipoDescuentoModificacionComponent', () => {
  let component: TipoDescuentoModificacionComponent;
  let fixture: ComponentFixture<TipoDescuentoModificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoDescuentoModificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoDescuentoModificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
