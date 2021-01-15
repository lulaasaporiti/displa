import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaPorClienteComponent } from './cuenta-por-cliente.component';

describe('CuentaPorClienteComponent', () => {
  let component: CuentaPorClienteComponent;
  let fixture: ComponentFixture<CuentaPorClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaPorClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaPorClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
