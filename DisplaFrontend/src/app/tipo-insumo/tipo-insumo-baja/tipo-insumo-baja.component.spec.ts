import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoInsumoBajaComponent } from './tipo-insumo-baja.component';

describe('TipoInsumoBajaComponent', () => {
  let component: TipoInsumoBajaComponent;
  let fixture: ComponentFixture<TipoInsumoBajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoInsumoBajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoInsumoBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
