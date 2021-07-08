import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaDebitoProveedorComponent } from './nota-debito.component';

describe('NotaDebitoProveedorComponent', () => {
  let component: NotaDebitoProveedorComponent;
  let fixture: ComponentFixture<NotaDebitoProveedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotaDebitoProveedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaDebitoProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
