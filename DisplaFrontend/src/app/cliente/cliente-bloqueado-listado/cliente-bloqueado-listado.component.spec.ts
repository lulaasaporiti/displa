import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteBloqueadoListadoComponent } from './cliente-bloqueado-listado.component';

describe('ClienteBloqueadoListadoComponent', () => {
  let component: ClienteBloqueadoListadoComponent;
  let fixture: ComponentFixture<ClienteBloqueadoListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteBloqueadoListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteBloqueadoListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
