import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FacturaConfirmarComponent } from './factura-confirmar.component';


describe('FacturaConfirmarComponent', () => {
  let component: FacturaConfirmarComponent;
  let fixture: ComponentFixture<FacturaConfirmarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturaConfirmarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaConfirmarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
