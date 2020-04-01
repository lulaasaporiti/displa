import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LenteSeleccionComponent } from './lente-seleccion.component';

describe('LenteSeleccionComponent', () => {
  let component: LenteSeleccionComponent;
  let fixture: ComponentFixture<LenteSeleccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LenteSeleccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LenteSeleccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
