import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequeCarteraComponent } from './cheque-cartera.component';

describe('ChequeCarteraComponent', () => {
  let component: ChequeCarteraComponent;
  let fixture: ComponentFixture<ChequeCarteraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequeCarteraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequeCarteraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
