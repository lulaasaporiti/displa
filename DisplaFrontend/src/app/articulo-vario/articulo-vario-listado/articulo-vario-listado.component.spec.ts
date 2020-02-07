import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloVarioListadoComponent } from './articulo-vario-listado.component';

describe('ArticuloVarioListadoComponent', () => {
  let component: ArticuloVarioListadoComponent;
  let fixture: ComponentFixture<ArticuloVarioListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticuloVarioListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloVarioListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
