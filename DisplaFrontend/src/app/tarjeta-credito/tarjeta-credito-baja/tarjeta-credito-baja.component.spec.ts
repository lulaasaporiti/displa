import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaCreditoBajaComponent } from './tarjeta-credito-baja.component';

describe('TarjetaCreditoBajaComponent', () => {
  let component: TarjetaCreditoBajaComponent;
  let fixture: ComponentFixture<TarjetaCreditoBajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarjetaCreditoBajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaCreditoBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
