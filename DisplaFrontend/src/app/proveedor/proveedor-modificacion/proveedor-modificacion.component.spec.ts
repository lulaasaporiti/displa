import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorModificacionComponent } from './proveedor-modificacion.component';

describe('ProveedorModificacionComponent', () => {
  let component: ProveedorModificacionComponent;
  let fixture: ComponentFixture<ProveedorModificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProveedorModificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedorModificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
