import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoBlockListadoComponent } from './tipo-block-listado.component';

describe('TipoBlockListadoComponent', () => {
  let component: TipoBlockListadoComponent;
  let fixture: ComponentFixture<TipoBlockListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoBlockListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoBlockListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
