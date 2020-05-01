import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BancoAltaComponent } from './banco-alta.component';

describe('BancoAltaComponent', () => {
  let component: BancoAltaComponent;
  let fixture: ComponentFixture<BancoAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BancoAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BancoAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
