import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaClienteMesComponent } from './venta-cliente-mes.component';

describe('VentaClienteMesComponent', () => {
  let component: VentaClienteMesComponent;
  let fixture: ComponentFixture<VentaClienteMesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentaClienteMesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaClienteMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
