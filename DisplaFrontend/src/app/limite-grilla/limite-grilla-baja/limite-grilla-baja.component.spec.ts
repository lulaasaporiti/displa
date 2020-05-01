import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LimiteGrillaBajaComponent } from './limite-grilla-baja.component';

describe('LimiteGrillaBajaComponent', () => {
  let component: LimiteGrillaBajaComponent;
  let fixture: ComponentFixture<LimiteGrillaBajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LimiteGrillaBajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LimiteGrillaBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
