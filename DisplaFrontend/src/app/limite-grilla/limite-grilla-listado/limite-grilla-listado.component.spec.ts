import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LimiteGrillaListadoComponent } from './limite-grilla-listado.component';

describe('LimiteGrillaListadoComponent', () => {
  let component: LimiteGrillaListadoComponent;
  let fixture: ComponentFixture<LimiteGrillaListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LimiteGrillaListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LimiteGrillaListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
