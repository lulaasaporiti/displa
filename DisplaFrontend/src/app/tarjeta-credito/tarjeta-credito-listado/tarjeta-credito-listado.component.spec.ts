import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaCreditoListadoComponent } from './tarjeta-credito-listado.component';

describe('TarjetaCreditoListadoComponent', () => {
  let component: TarjetaCreditoListadoComponent;
  let fixture: ComponentFixture<TarjetaCreditoListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarjetaCreditoListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaCreditoListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
