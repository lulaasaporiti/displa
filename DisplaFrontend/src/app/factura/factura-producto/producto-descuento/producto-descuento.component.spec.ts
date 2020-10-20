import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductoDescuentoComponent } from './producto-descuento.component';


describe('ProductoDescuentoComponent', () => {
  let component: ProductoDescuentoComponent;
  let fixture: ComponentFixture<ProductoDescuentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoDescuentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoDescuentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
