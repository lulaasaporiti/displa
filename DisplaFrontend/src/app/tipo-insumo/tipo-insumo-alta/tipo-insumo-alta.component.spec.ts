import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoInsumoAltaComponent } from './tipo-insumo-alta.component';

describe('TipoInsumoAltaComponent', () => {
  let component: TipoInsumoAltaComponent;
  let fixture: ComponentFixture<TipoInsumoAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoInsumoAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoInsumoAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
