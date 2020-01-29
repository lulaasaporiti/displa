import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorListadoComponent } from './proveedor-listado.component';

describe('ProveedorListadoComponent', () => {
  let component: ProveedorListadoComponent;
  let fixture: ComponentFixture<ProveedorListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProveedorListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedorListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
