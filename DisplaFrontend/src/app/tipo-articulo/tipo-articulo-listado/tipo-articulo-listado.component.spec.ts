import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoArticuloListadoComponent } from './tipo-articulo-listado.component';

describe('TipoArticuloListadoComponent', () => {
  let component: TipoArticuloListadoComponent;
  let fixture: ComponentFixture<TipoArticuloListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoArticuloListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoArticuloListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
