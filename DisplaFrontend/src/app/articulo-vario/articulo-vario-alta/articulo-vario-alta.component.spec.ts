import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloVarioAltaComponent } from './articulo-vario-alta.component';

describe('ArticuloVarioAltaComponent', () => {
  let component: ArticuloVarioAltaComponent;
  let fixture: ComponentFixture<ArticuloVarioAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticuloVarioAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloVarioAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
