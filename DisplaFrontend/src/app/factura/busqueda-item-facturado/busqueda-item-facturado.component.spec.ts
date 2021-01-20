import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BusquedaItemFacturadoComponent } from './busqueda-item-facturado.component';


describe('BusquedaItemFacturadoComponent', () => {
  let component: BusquedaItemFacturadoComponent;
  let fixture: ComponentFixture<BusquedaItemFacturadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaItemFacturadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaItemFacturadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
