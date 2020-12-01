import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ResumenLenteComponent } from './resumen-lente.component';


describe('ResumenLenteComponent', () => {
  let component: ResumenLenteComponent;
  let fixture: ComponentFixture<ResumenLenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenLenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenLenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
