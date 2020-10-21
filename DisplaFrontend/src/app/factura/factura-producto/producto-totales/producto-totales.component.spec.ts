import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductoTotalesComponent } from './producto-totales.component';


describe('ProductoTotalesComponent', () => {
  let component: ProductoTotalesComponent;
  let fixture: ComponentFixture<ProductoTotalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoTotalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoTotalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
