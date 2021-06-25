import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaProveedorComponent } from './factura.component';

describe('FacturaProveedorComponent', () => {
  let component: FacturaProveedorComponent;
  let fixture: ComponentFixture<FacturaProveedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturaProveedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
