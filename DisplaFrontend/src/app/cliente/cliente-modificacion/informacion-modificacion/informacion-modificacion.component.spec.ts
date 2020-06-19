import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionModificacionComponent } from './informacion-modificacion.component';

describe('InformacionModificacionComponent', () => {
  let component: InformacionModificacionComponent;
  let fixture: ComponentFixture<InformacionModificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacionModificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionModificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
