import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockModificacionComponent } from './block-modificacion.component';

describe('BlockModificacionComponent', () => {
  let component: BlockModificacionComponent;
  let fixture: ComponentFixture<BlockModificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockModificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockModificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
