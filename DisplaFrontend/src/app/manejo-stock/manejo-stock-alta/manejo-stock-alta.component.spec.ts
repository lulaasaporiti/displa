import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManejoStockAltaComponent } from './manejo-stock-alta.component';

describe('ManejoStockAltaComponent', () => {
  let component: ManejoStockAltaComponent;
  let fixture: ComponentFixture<ManejoStockAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManejoStockAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManejoStockAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
