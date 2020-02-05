import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoServicioAltaComponent } from './tipo-servicio-alta.component';

describe('TipoServicioAltaComponent', () => {
  let component: TipoServicioAltaComponent;
  let fixture: ComponentFixture<TipoServicioAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoServicioAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoServicioAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
