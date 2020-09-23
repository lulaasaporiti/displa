import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaAltaComponent } from './factura-alta.component';

describe('FacturaAltaComponent', () => {
  let component: FacturaAltaComponent;
  let fixture: ComponentFixture<FacturaAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturaAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
