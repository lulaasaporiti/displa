import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaVirtualModificacionComponent } from './venta-virtual-modificacion.component';

describe('VentaVirtualModificacionComponent', () => {
  let component: VentaVirtualModificacionComponent;
  let fixture: ComponentFixture<VentaVirtualModificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentaVirtualModificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaVirtualModificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
