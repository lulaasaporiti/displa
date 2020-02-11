import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LenteAltaComponent } from './lente-alta.component';

describe('LenteAltaComponent', () => {
  let component: LenteAltaComponent;
  let fixture: ComponentFixture<LenteAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LenteAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LenteAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
