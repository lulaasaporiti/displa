import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CondicionVentaModificacionComponent } from './condicion-venta-modificacion.component';

describe('CondicionVentaModificacionComponent', () => {
  let component: CondicionVentaModificacionComponent;
  let fixture: ComponentFixture<CondicionVentaModificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CondicionVentaModificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CondicionVentaModificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
