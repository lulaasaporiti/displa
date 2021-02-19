import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequeAltaComponent } from './cheque-alta.component';

describe('ChequeAltaComponent', () => {
  let component: ChequeAltaComponent;
  let fixture: ComponentFixture<ChequeAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequeAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequeAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
