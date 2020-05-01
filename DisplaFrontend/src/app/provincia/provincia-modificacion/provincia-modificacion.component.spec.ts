import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinciaModificacionComponent } from './provincia-modificacion.component';

describe('ProvinciaModificacionComponent', () => {
  let component: ProvinciaModificacionComponent;
  let fixture: ComponentFixture<ProvinciaModificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvinciaModificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvinciaModificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
