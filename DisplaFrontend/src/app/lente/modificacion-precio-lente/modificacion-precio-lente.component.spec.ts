import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificacionPrecioLenteComponent } from './modificacion-precio-lente.component';

describe('ModificacionPrecioLenteComponent', () => {
  let component: ModificacionPrecioLenteComponent;
  let fixture: ComponentFixture<ModificacionPrecioLenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificacionPrecioLenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificacionPrecioLenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
