import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PorcentajeDescuentosComponent } from './porcentaje-descuentos.component';

describe('PorcentajeDescuentosComponent', () => {
  let component: PorcentajeDescuentosComponent;
  let fixture: ComponentFixture<PorcentajeDescuentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PorcentajeDescuentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PorcentajeDescuentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
