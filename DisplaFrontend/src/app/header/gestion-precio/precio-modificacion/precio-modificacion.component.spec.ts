import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecioModificacionComponent } from './precio-modificacion.component';

describe('PrecioModificacionComponent', () => {
  let component: PrecioModificacionComponent;
  let fixture: ComponentFixture<PrecioModificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrecioModificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecioModificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
