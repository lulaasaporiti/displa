import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaAltaComponent } from './ficha-alta.component';

describe('FichaAltaComponent', () => {
  let component: FichaAltaComponent;
  let fixture: ComponentFixture<FichaAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
