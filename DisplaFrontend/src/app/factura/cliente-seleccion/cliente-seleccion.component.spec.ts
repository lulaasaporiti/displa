import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteSeleccionComponent } from './cliente-seleccion.component';

describe('ClienteSeleccionComponent', () => {
  let component: ClienteSeleccionComponent;
  let fixture: ComponentFixture<ClienteSeleccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteSeleccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteSeleccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
