import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoBlockAltaComponent } from './tipo-block-alta.component';

describe('TipoBlockAltaComponent', () => {
  let component: TipoBlockAltaComponent;
  let fixture: ComponentFixture<TipoBlockAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoBlockAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoBlockAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
