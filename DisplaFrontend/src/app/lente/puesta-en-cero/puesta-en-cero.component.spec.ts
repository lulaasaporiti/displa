import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuestaEnCeroComponent } from './puesta-en-cero.component';

describe('LenteSeleccionComponent', () => {
  let component: PuestaEnCeroComponent;
  let fixture: ComponentFixture<PuestaEnCeroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuestaEnCeroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuestaEnCeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
