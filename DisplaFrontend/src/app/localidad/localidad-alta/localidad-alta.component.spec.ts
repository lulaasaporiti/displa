import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalidadAltaComponent } from './localidad-alta.component';

describe('LocalidadAltaComponent', () => {
  let component: LocalidadAltaComponent;
  let fixture: ComponentFixture<LocalidadAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalidadAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalidadAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
