import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CondicionVentaAltaComponent } from './condicion-venta-alta.component';

describe('CondicionVentaAltaComponent', () => {
  let component: CondicionVentaAltaComponent;
  let fixture: ComponentFixture<CondicionVentaAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CondicionVentaAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CondicionVentaAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
