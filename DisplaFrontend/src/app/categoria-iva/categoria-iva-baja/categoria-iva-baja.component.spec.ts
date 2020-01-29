import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaIVABajaComponent } from './categoria-iva-baja.component';

describe('CategoriaIVABajaComponent', () => {
  let component: CategoriaIVABajaComponent;
  let fixture: ComponentFixture<CategoriaIVABajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaIVABajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaIVABajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
