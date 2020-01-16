import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioBajaComponent } from './usuario-baja.component';

describe('UsuarioBajaComponent', () => {
  let component: UsuarioBajaComponent;
  let fixture: ComponentFixture<UsuarioBajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioBajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
