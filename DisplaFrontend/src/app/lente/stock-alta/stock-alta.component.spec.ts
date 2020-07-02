import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockAltaComponent } from './stock-alta.component';

describe('StockAltaComponent', () => {
  let component: StockAltaComponent;
  let fixture: ComponentFixture<StockAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
