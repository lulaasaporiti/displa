import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SeleccionRecargosComponent } from './seleccion-recargos.component';


describe('SeleccionRecargosComponent', () => {
  let component: SeleccionRecargosComponent;
  let fixture: ComponentFixture<SeleccionRecargosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionRecargosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionRecargosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
