import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaVirtualMovimientosComponent } from './venta-virtual-movimientos.component';

describe('VentaVirtualMovimientosComponent', () => {
  let component: VentaVirtualMovimientosComponent;
  let fixture: ComponentFixture<VentaVirtualMovimientosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentaVirtualMovimientosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaVirtualMovimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
