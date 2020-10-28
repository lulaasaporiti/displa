import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SeleccionLenteComponent } from './seleccion-lente.component';


describe('SeleccionLenteComponent', () => {
  let component: SeleccionLenteComponent;
  let fixture: ComponentFixture<SeleccionLenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionLenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionLenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
