import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinciaBajaComponent } from './provincia-baja.component';

describe('ProvinciaBajaComponent', () => {
  let component: ProvinciaBajaComponent;
  let fixture: ComponentFixture<ProvinciaBajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvinciaBajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvinciaBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
