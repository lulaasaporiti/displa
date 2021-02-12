import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprobanteDetalleComponent } from './comprobante-detalle.component';

describe('ComprobanteDetalleComponent', () => {
  let component: ComprobanteDetalleComponent;
  let fixture: ComponentFixture<ComprobanteDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprobanteDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprobanteDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
