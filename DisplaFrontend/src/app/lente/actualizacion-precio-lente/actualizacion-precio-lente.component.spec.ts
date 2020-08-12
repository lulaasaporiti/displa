import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizacionPrecioLenteComponent } from './actualizacion-precio-lente.component';

describe('PrecioLenteListadoComponent', () => {
  let component: ActualizacionPrecioLenteComponent;
  let fixture: ComponentFixture<ActualizacionPrecioLenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizacionPrecioLenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizacionPrecioLenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
