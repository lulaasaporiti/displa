import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoArticuloAltaComponent } from './tipo-articulo-alta.component';

describe('TipoArticuloAltaComponent', () => {
  let component: TipoArticuloAltaComponent;
  let fixture: ComponentFixture<TipoArticuloAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoArticuloAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoArticuloAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
