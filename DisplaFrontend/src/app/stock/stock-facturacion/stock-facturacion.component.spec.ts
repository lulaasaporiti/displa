import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockFacturacionComponent } from './stock-facturacion.component';

describe('StockFacturacionComponent', () => {
  let component: StockFacturacionComponent;
  let fixture: ComponentFixture<StockFacturacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockFacturacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockFacturacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
