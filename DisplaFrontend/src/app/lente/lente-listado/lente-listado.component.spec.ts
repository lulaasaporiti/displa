import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LenteListadoComponent } from './lente-listado.component';

describe('LenteListadoComponent', () => {
  let component: LenteListadoComponent;
  let fixture: ComponentFixture<LenteListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LenteListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LenteListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
