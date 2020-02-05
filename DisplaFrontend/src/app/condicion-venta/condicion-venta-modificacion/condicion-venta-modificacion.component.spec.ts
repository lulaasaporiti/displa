import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaIVAModificacionComponent } from './condicion-venta-modificacion.component';

describe('CategoriaIVAModificacionComponent', () => {
  let component: CategoriaIVAModificacionComponent;
  let fixture: ComponentFixture<CategoriaIVAModificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaIVAModificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaIVAModificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
