import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecioListaUnoComponent } from './precio-lista-uno.component';

describe('PrecioListaUnoComponent', () => {
  let component: PrecioListaUnoComponent;
  let fixture: ComponentFixture<PrecioListaUnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrecioListaUnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecioListaUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
