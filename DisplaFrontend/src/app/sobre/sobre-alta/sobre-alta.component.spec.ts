import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SobreAltaComponent } from './sobre-alta.component';

describe('SobreAltaComponent', () => {
  let component: SobreAltaComponent;
  let fixture: ComponentFixture<SobreAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SobreAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SobreAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
