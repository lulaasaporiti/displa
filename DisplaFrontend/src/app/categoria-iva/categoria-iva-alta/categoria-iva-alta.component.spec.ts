import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaIVAAltaComponent } from './categoria-iva-alta.component';

describe('CategoriaIVAAltaComponent', () => {
  let component: CategoriaIVAAltaComponent;
  let fixture: ComponentFixture<CategoriaIVAAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaIVAAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaIVAAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
