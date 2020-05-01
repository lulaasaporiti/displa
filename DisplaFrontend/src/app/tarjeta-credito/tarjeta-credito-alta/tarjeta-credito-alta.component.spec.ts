import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaCreditoAltaComponent } from './tarjeta-credito-alta.component';

describe('TarjetaCreditoAltaComponent', () => {
  let component: TarjetaCreditoAltaComponent;
  let fixture: ComponentFixture<TarjetaCreditoAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarjetaCreditoAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaCreditoAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
