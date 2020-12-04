import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SobreConsultaComponent } from './sobre-consulta.component';

describe('SobreConsultaComponent', () => {
  let component: SobreConsultaComponent;
  let fixture: ComponentFixture<SobreConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SobreConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SobreConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
