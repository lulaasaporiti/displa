import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsumoAltaComponent } from './insumo-alta.component';

describe('InsumoAltaComponent', () => {
  let component: InsumoAltaComponent;
  let fixture: ComponentFixture<InsumoAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsumoAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsumoAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
