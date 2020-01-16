import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsumoListadoComponent } from './insumo-listado.component';

describe('InsumoListadoComponent', () => {
  let component: InsumoListadoComponent;
  let fixture: ComponentFixture<InsumoListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsumoListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsumoListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
