import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecioArticuloListadoComponent } from './precio-articulo-listado.component';

describe('PrecioArticuloListadoComponent', () => {
  let component: PrecioArticuloListadoComponent;
  let fixture: ComponentFixture<PrecioArticuloListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrecioArticuloListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecioArticuloListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
