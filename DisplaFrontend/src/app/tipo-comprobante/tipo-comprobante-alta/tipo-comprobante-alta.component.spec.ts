import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TipoComprobanteAltaComponent } from './tipo-comprobante-alta.component';


describe('TipoComprobanteAltaComponent', () => {
  let component: TipoComprobanteAltaComponent;
  let fixture: ComponentFixture<TipoComprobanteAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoComprobanteAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoComprobanteAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
