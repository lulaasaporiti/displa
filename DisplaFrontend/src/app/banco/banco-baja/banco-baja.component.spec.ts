import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BancoBajaComponent } from './banco-baja.component';

describe('BancoBajaComponent', () => {
  let component: BancoBajaComponent;
  let fixture: ComponentFixture<BancoBajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BancoBajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BancoBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
