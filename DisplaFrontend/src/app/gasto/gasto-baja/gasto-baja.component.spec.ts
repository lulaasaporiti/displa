import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GastoBajaComponent } from './gasto-baja.component';

describe('GastoBajaComponent', () => {
  let component: GastoBajaComponent;
  let fixture: ComponentFixture<GastoBajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GastoBajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GastoBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
