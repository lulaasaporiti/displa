import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsumoModificacionComponent } from './insumo-modificacion.component';

describe('InsumoModificacionComponent', () => {
  let component: InsumoModificacionComponent;
  let fixture: ComponentFixture<InsumoModificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsumoModificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsumoModificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
