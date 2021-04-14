import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnulacionComprobanteComponent } from './anulacion-comprobante.component';

describe('AnulacionComprobanteComponent', () => {
  let component: AnulacionComprobanteComponent;
  let fixture: ComponentFixture<AnulacionComprobanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnulacionComprobanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnulacionComprobanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
