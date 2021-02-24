import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrasladoFondoComponent } from './traslado-fondo.component';

describe('TrasladoFondoComponent', () => {
  let component: TrasladoFondoComponent;
  let fixture: ComponentFixture<TrasladoFondoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrasladoFondoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrasladoFondoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
