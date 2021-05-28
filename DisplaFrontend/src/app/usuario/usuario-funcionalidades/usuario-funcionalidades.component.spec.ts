import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioFuncionesComponent } from './usuario-funcionalidades.component';

describe('UsuarioFuncionesComponent', () => {
  let component: UsuarioFuncionesComponent;
  let fixture: ComponentFixture<UsuarioFuncionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioFuncionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioFuncionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
