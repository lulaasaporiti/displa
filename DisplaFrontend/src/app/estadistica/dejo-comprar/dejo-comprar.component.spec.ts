import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DejoComprarComponent } from './dejo-comprar.component';

describe('DejoComprarComponent', () => {
  let component: DejoComprarComponent;
  let fixture: ComponentFixture<DejoComprarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DejoComprarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DejoComprarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
