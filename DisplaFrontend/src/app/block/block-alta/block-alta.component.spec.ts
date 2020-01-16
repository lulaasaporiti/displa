import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockAltaComponent } from './block-alta.component';

describe('BlockAltaComponent', () => {
  let component: BlockAltaComponent;
  let fixture: ComponentFixture<BlockAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
