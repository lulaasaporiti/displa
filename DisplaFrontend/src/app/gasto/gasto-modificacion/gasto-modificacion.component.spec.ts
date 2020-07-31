import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GastoModificacionComponent } from './gasto-modificacion.component';

describe('GastoModificacionComponent', () => {
  let component: GastoModificacionComponent;
  let fixture: ComponentFixture<GastoModificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GastoModificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GastoModificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
