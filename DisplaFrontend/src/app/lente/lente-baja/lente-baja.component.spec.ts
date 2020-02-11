import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LenteBajaComponent } from './lente-baja.component';

describe('LenteBajaComponent', () => {
  let component: LenteBajaComponent;
  let fixture: ComponentFixture<LenteBajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LenteBajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LenteBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
