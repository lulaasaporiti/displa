import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaCreditoProveedorComponent } from './nota-credito.component';

describe('NotaCreditoProveedorComponent', () => {
  let component: NotaCreditoProveedorComponent;
  let fixture: ComponentFixture<NotaCreditoProveedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotaCreditoProveedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaCreditoProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
