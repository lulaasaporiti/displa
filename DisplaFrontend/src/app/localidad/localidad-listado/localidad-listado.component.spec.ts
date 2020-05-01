import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalidadListadoComponent } from './localidad-listado.component';

describe('LocalidadListadoComponent', () => {
  let component: LocalidadListadoComponent;
  let fixture: ComponentFixture<LocalidadListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalidadListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalidadListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
