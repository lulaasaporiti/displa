import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductoArticuloComponent } from './producto-articulo.component';


describe('ProductoArticuloComponent', () => {
  let component: ProductoArticuloComponent;
  let fixture: ComponentFixture<ProductoArticuloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoArticuloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
