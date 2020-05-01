import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LimiteGrillaModificacionComponent } from './limite-grilla-modificacion.component';

describe('LimiteGrillaModificacionComponent', () => {
  let component: LimiteGrillaModificacionComponent;
  let fixture: ComponentFixture<LimiteGrillaModificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LimiteGrillaModificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LimiteGrillaModificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
