import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoInsumoListadoComponent } from './tipo-insumo-listado.component';

describe('TipoInsumoListadoComponent', () => {
  let component: TipoInsumoListadoComponent;
  let fixture: ComponentFixture<TipoInsumoListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoInsumoListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoInsumoListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
