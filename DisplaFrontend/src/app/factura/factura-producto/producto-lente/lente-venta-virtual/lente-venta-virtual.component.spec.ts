import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LenteVentaVirtualComponent } from './lente-venta-virtual.component';


describe('LenteVentaVirtualComponent', () => {
  let component: LenteVentaVirtualComponent;
  let fixture: ComponentFixture<LenteVentaVirtualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LenteVentaVirtualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LenteVentaVirtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
