import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioAltaComponent } from './servicio-alta.component';

describe('ServicioAltaComponent', () => {
  let component: ServicioAltaComponent;
  let fixture: ComponentFixture<ServicioAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicioAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicioAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
