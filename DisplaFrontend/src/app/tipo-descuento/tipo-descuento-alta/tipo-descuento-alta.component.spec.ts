import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDescuentoAltaComponent } from './tipo-descuento-alta.component';

describe('TipoDescuentoAltaComponent', () => {
  let component: TipoDescuentoAltaComponent;
  let fixture: ComponentFixture<TipoDescuentoAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoDescuentoAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoDescuentoAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
