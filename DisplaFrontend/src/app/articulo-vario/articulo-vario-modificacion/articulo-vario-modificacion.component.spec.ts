import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloVarioModificacionComponent } from './articulo-vario-modificacion.component';

describe('ArticuloVarioModificacionComponent', () => {
  let component: ArticuloVarioModificacionComponent;
  let fixture: ComponentFixture<ArticuloVarioModificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticuloVarioModificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloVarioModificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
