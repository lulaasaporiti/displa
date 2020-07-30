import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecioActualizacionComponent } from './precio-actualizacion.component';

describe('PrecioActualizacionComponent', () => {
  let component: PrecioActualizacionComponent;
  let fixture: ComponentFixture<PrecioActualizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrecioActualizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecioActualizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
