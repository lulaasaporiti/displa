import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteAltaComponent } from './cliente-alta.component';

describe('ClienteAltaComponent', () => {
  let component: ClienteAltaComponent;
  let fixture: ComponentFixture<ClienteAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
