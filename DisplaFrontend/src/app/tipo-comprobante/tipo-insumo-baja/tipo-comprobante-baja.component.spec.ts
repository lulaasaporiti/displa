import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TipoComprobanteBajaComponent } from './tipo-comprobante-baja.component';


describe('TipoComprobanteBajaComponent', () => {
  let component: TipoComprobanteBajaComponent;
  let fixture: ComponentFixture<TipoComprobanteBajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoComprobanteBajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoComprobanteBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
