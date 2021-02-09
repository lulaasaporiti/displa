import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BusquedaItemComprobanteComponent } from './busqueda-item-comprobante.component';


describe('BusquedaItemComprobanteComponent', () => {
  let component: BusquedaItemComprobanteComponent;
  let fixture: ComponentFixture<BusquedaItemComprobanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaItemComprobanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaItemComprobanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
