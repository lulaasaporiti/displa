import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaIVAListadoComponent } from './condicion-venta-listado.component';

describe('CategoriaIVAListadoComponent', () => {
  let component: CategoriaIVAListadoComponent;
  let fixture: ComponentFixture<CategoriaIVAListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaIVAListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaIVAListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
