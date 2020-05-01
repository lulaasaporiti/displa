import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaCreditoModificacionComponent } from './tarjeta-credito-modificacion.component';

describe('TarjetaCreditoModificacionComponent', () => {
  let component: TarjetaCreditoModificacionComponent;
  let fixture: ComponentFixture<TarjetaCreditoModificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarjetaCreditoModificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaCreditoModificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
