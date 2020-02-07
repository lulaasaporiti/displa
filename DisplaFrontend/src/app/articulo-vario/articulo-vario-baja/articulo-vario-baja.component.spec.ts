import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloVarioBajaComponent } from './articulo-vario-baja.component';

describe('ArticuloVarioBajaComponent', () => {
  let component: ArticuloVarioBajaComponent;
  let fixture: ComponentFixture<ArticuloVarioBajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticuloVarioBajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloVarioBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
