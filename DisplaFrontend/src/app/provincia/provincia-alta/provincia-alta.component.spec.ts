import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinciaAltaComponent } from './provincia-alta.component';

describe('ProvinciaAltaComponent', () => {
  let component: ProvinciaAltaComponent;
  let fixture: ComponentFixture<ProvinciaAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvinciaAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvinciaAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
