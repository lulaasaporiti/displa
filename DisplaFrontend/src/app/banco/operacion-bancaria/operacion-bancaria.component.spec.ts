import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacionCuentaBancariaComponent } from './operacion-bancaria.component';

describe('OperacionCuentaBancariaComponent', () => {
  let component: OperacionCuentaBancariaComponent;
  let fixture: ComponentFixture<OperacionCuentaBancariaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperacionCuentaBancariaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperacionCuentaBancariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
