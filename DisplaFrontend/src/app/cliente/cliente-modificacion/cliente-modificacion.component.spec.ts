import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteModificacionComponent } from './cliente-modificacion.component';

describe('ClienteModificacionComponent', () => {
  let component: ClienteModificacionComponent;
  let fixture: ComponentFixture<ClienteModificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteModificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteModificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
