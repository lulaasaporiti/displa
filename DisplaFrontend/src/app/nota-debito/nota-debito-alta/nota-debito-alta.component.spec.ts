import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaDebitoComponent } from './nota-debito-alta.component';

describe('NotaDebitoComponent', () => {
  let component: NotaDebitoComponent;
  let fixture: ComponentFixture<NotaDebitoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotaDebitoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaDebitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
