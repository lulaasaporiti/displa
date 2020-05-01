import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalidadModificacionComponent } from './localidad-modificacion.component';

describe('LocalidadModificacionComponent', () => {
  let component: LocalidadModificacionComponent;
  let fixture: ComponentFixture<LocalidadModificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalidadModificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalidadModificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
