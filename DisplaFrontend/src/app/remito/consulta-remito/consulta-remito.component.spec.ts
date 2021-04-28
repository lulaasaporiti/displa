import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaRemitoComponent } from './anulacion-comprobante.component';

describe('ConsultaRemitoComponent', () => {
  let component: ConsultaRemitoComponent;
  let fixture: ComponentFixture<ConsultaRemitoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaRemitoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaRemitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
