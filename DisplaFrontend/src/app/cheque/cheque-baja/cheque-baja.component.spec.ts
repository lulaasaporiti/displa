import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequeBajaComponent } from './cheque-baja.component';

describe('ChequeBajaComponent', () => {
  let component: ChequeBajaComponent;
  let fixture: ComponentFixture<ChequeBajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequeBajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequeBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
