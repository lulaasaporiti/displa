import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteBloqueoManualComponent } from './cliente-bloqueo-manual.component';

describe('ClienteBloqueoManualComponent', () => {
  let component: ClienteBloqueoManualComponent;
  let fixture: ComponentFixture<ClienteBloqueoManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteBloqueoManualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteBloqueoManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
