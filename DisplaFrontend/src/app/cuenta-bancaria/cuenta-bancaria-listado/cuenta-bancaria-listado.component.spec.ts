import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaBancariaListadoComponent } from './cuenta-bancaria-listado.component';

describe('CuentaBancariaListadoComponent', () => {
  let component: CuentaBancariaListadoComponent;
  let fixture: ComponentFixture<CuentaBancariaListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaBancariaListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaBancariaListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
