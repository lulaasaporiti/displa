import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemitoDetalleComponent } from './remito-detalle.component';

describe('RemitoDetalleComponent', () => {
  let component: RemitoDetalleComponent;
  let fixture: ComponentFixture<RemitoDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemitoDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemitoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
