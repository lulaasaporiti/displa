import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoBlockModificacionComponent } from './tipo-block-modificacion.component';

describe('TipoBlockModificacionComponent', () => {
  let component: TipoBlockModificacionComponent;
  let fixture: ComponentFixture<TipoBlockModificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoBlockModificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoBlockModificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
