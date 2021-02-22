import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaBancariaModificacionComponent } from './cuenta-bancaria-modificacion.component';

describe('CuentaBancariaModificacionComponent', () => {
  let component: CuentaBancariaModificacionComponent;
  let fixture: ComponentFixture<CuentaBancariaModificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaBancariaModificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaBancariaModificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
