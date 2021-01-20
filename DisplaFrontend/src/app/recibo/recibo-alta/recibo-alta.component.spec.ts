import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciboAltaComponent } from './recibo-alta.component';

describe('UbicacionAltaComponent', () => {
  let component: ReciboAltaComponent;
  let fixture: ComponentFixture<ReciboAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReciboAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReciboAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
