import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoArticuloBajaComponent } from './tipo-articulo-baja.component';

describe('TipoArticuloBajaComponent', () => {
  let component: TipoArticuloBajaComponent;
  let fixture: ComponentFixture<TipoArticuloBajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoArticuloBajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoArticuloBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
