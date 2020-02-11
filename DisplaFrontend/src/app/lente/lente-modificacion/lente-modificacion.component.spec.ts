import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LenteModificacionComponent } from './lente-modificacion.component';

describe('LenteModificacionComponent', () => {
  let component: LenteModificacionComponent;
  let fixture: ComponentFixture<LenteModificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LenteModificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LenteModificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
