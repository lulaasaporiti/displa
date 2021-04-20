import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciboDetalleComponent } from './recibo-detalle.component';

describe('ReciboDetalleComponent', () => {
  let component: ReciboDetalleComponent;
  let fixture: ComponentFixture<ReciboDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReciboDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReciboDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
