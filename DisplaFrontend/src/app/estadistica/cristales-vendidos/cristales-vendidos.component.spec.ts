import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CristalesVendidosComponent } from './cristales-vendidos.component';

describe('CristalesVendidosComponent', () => {
  let component: CristalesVendidosComponent;
  let fixture: ComponentFixture<CristalesVendidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CristalesVendidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CristalesVendidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
