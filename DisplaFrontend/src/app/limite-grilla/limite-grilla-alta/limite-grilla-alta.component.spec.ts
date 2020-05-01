import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LimiteGrillaAltaComponent } from './limite-grilla-alta.component';

describe('LimiteGrillaAltaComponent', () => {
  let component: LimiteGrillaAltaComponent;
  let fixture: ComponentFixture<LimiteGrillaAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LimiteGrillaAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LimiteGrillaAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
