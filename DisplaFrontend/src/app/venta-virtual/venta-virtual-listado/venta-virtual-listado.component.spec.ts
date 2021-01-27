import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaVirtualListadoComponent } from './venta-virtual-listado.component';

describe('VentaVirtualListadoComponent', () => {
  let component: VentaVirtualListadoComponent;
  let fixture: ComponentFixture<VentaVirtualListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentaVirtualListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaVirtualListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
