import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LenteDetalleComponent } from './lente-detalle.component';

describe('LenteDetalleComponent', () => {
  let component: LenteDetalleComponent;
  let fixture: ComponentFixture<LenteDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LenteDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LenteDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
