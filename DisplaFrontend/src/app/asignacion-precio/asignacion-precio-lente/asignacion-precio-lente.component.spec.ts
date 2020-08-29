import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionPrecioClienteLenteComponent } from './asignacion-precio-lente.component';

describe('AsignacionPrecioClienteLenteComponent', () => {
  let component: AsignacionPrecioClienteLenteComponent;
  let fixture: ComponentFixture<AsignacionPrecioClienteLenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignacionPrecioClienteLenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignacionPrecioClienteLenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
