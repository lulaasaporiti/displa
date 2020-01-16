import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioModificacionComponent } from './usuario-modificacion.component';

describe('UsuarioModificacionComponent', () => {
  let component: UsuarioModificacionComponent;
  let fixture: ComponentFixture<UsuarioModificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioModificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioModificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
