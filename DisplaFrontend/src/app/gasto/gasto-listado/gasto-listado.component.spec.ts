import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GastoListadoComponent } from './gasto-listado.component';

describe('GastoListadoComponent', () => {
  let component: GastoListadoComponent;
  let fixture: ComponentFixture<GastoListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GastoListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GastoListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
