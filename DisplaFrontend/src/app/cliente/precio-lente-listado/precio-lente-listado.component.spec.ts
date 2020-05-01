import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecioLenteListadoComponent } from './precio-lente-listado.component';

describe('PrecioLenteListadoComponent', () => {
  let component: PrecioLenteListadoComponent;
  let fixture: ComponentFixture<PrecioLenteListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrecioLenteListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecioLenteListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
