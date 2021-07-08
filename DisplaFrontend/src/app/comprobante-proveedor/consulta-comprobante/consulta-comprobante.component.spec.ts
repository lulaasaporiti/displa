import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaComprobanteProveedorComponent } from './consulta-comprobante.component';

describe('ConsultaComprobanteProveedorComponent', () => {
  let component: ConsultaComprobanteProveedorComponent;
  let fixture: ComponentFixture<ConsultaComprobanteProveedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaComprobanteProveedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaComprobanteProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
