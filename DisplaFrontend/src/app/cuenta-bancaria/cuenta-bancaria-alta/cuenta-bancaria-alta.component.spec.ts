import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaBancariaAltaComponent } from './cuenta-bancaria-alta.component';

describe('CuentaBancariaAltaComponent', () => {
  let component: CuentaBancariaAltaComponent;
  let fixture: ComponentFixture<CuentaBancariaAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaBancariaAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaBancariaAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
