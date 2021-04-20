import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnulacionConfirmacionComponent } from './anulacion-confirmacion.component';

describe('AnulacionConfirmacionComponent', () => {
  let component: AnulacionConfirmacionComponent;
  let fixture: ComponentFixture<AnulacionConfirmacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnulacionConfirmacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnulacionConfirmacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
