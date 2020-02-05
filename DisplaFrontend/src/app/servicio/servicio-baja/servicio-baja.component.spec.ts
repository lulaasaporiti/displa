import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioBajaComponent } from './servicio-baja.component';

describe('ServicioBajaComponent', () => {
  let component: ServicioBajaComponent;
  let fixture: ComponentFixture<ServicioBajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicioBajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicioBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
