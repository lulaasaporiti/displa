import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GastoAltaComponent } from './gasto-alta.component';

describe('GastoAltaComponent', () => {
  let component: GastoAltaComponent;
  let fixture: ComponentFixture<GastoAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GastoAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GastoAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
