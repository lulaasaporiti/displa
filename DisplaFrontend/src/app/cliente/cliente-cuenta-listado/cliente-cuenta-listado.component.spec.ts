import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteCuentaListadoComponent } from './cliente-cuenta-listado.component';

describe('ClienteCuentaListadoComponentv', () => {
  let component: ClienteCuentaListadoComponent;
  let fixture: ComponentFixture<ClienteCuentaListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteCuentaListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteCuentaListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
