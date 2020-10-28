import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SeleccionServiciosComponent } from './seleccion-servicios.component';


describe('SeleccionServiciosComponent', () => {
  let component: SeleccionServiciosComponent;
  let fixture: ComponentFixture<SeleccionServiciosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionServiciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
