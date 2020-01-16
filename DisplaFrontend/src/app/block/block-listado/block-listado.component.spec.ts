import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockListadoComponent } from './block-listado.component';

describe('BlockListadoComponent', () => {
  let component: BlockListadoComponent;
  let fixture: ComponentFixture<BlockListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
