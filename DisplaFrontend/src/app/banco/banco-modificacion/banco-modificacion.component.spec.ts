import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BancoModificacionComponent } from './banco-modificacion.component';

describe('BancoModificacionComponent', () => {
  let component: BancoModificacionComponent;
  let fixture: ComponentFixture<BancoModificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BancoModificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BancoModificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
