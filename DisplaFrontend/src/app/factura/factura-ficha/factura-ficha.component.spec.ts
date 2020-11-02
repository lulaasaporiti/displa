import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaFichaComponent } from './factura-ficha.component';

describe('FacturaFichaComponent', () => {
  let component: FacturaFichaComponent;
  let fixture: ComponentFixture<FacturaFichaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturaFichaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaFichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
