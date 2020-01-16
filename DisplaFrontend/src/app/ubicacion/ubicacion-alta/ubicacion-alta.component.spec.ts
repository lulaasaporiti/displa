import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicacionAltaComponent } from './ubicacion-alta.component';

describe('UbicacionAltaComponent', () => {
  let component: UbicacionAltaComponent;
  let fixture: ComponentFixture<UbicacionAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UbicacionAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UbicacionAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
