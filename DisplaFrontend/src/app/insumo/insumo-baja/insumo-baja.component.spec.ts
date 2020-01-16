import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsumoBajaComponent } from './insumo-baja.component';

describe('InsumoBajaComponent', () => {
  let component: InsumoBajaComponent;
  let fixture: ComponentFixture<InsumoBajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsumoBajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsumoBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
