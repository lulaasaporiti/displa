import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoInsumoModificacionComponent } from './tipo-insumo-modificacion.component';

describe('TipoInsumoModificacionComponent', () => {
  let component: TipoInsumoModificacionComponent;
  let fixture: ComponentFixture<TipoInsumoModificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoInsumoModificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoInsumoModificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
