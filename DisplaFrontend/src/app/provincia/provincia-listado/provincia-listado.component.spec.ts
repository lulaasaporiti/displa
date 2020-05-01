import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinciaListadoComponent } from './provincia-listado.component';

describe('ProvinciaListadoComponent', () => {
  let component: ProvinciaListadoComponent;
  let fixture: ComponentFixture<ProvinciaListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvinciaListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvinciaListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
