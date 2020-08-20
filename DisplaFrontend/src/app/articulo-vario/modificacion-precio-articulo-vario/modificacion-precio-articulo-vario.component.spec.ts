import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificacionPrecioArticuloVarioComponent } from './modificacion-precio-articulo-vario.component';

describe('ModificacionPrecioArticuloVarioComponent', () => {
  let component: ModificacionPrecioArticuloVarioComponent;
  let fixture: ComponentFixture<ModificacionPrecioArticuloVarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificacionPrecioArticuloVarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificacionPrecioArticuloVarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
