import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoArticuloModificacionComponent } from './tipo-articulo-modificacion.component';

describe('TipoArticuloModificacionComponent', () => {
  let component: TipoArticuloModificacionComponent;
  let fixture: ComponentFixture<TipoArticuloModificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoArticuloModificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoArticuloModificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
