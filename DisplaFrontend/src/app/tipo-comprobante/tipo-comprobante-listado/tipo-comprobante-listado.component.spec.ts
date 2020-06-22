import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TipoComprobanteListadoComponent } from './tipo-comprobante-listado.component';


describe('TipoComprobanteListadoComponent', () => {
  let component: TipoComprobanteListadoComponent;
  let fixture: ComponentFixture<TipoComprobanteListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoComprobanteListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoComprobanteListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
