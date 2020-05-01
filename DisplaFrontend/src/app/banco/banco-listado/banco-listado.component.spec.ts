import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BancoListadoComponent } from './banco-listado.component';

describe('BancoListadoComponent', () => {
  let component: BancoListadoComponent;
  let fixture: ComponentFixture<BancoListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BancoListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BancoListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
