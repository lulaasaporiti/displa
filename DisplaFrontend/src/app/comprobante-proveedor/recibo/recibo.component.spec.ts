import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciboProveedorComponent } from './recibo.component';

describe('ReciboProveedorComponent', () => {
  let component: ReciboProveedorComponent;
  let fixture: ComponentFixture<ReciboProveedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReciboProveedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReciboProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
