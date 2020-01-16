import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockBajaComponent } from './block-baja.component';

describe('BlockBajaComponent', () => {
  let component: BlockBajaComponent;
  let fixture: ComponentFixture<BlockBajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockBajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
