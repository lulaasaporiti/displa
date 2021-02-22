import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaBancariaBajaComponent } from './cuenta-bancaria-baja.component';

describe('CuentaBancariaBajaComponent', () => {
  let component: CuentaBancariaBajaComponent;
  let fixture: ComponentFixture<CuentaBancariaBajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaBancariaBajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaBancariaBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
