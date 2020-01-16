import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoBlockBajaComponent } from './tipo-block-baja.component';

describe('TipoBlockBajaComponent', () => {
  let component: TipoBlockBajaComponent;
  let fixture: ComponentFixture<TipoBlockBajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoBlockBajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoBlockBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
